import React, { useEffect, useState, RefObject } from 'react';
import { useSession } from 'next-auth/react';
import { getUser } from '../../../utils/authAction';
import {useRouter} from "next/router";
import {CheckoutContainer, CloseIcon, Form, FormInner, FormInnerRow, Label, Method, PayName, PayImgContainer} from "./styles";
import Image from "next/image";
import { Button,ErrorModal } from '../../Common';
import {InputWithLabel, Checkbox} from "../../Form";
import {STitle} from "../../Title/styles";
import {FlexBetween, FlexRow} from "../../Wrapper/styles";
import { IUserDocument } from '../../../models/User';
import {paymentMethod, shippingFee} from "../../../utils/data/payment";
import { axiosInstance } from "../../../utils/config";
import { AxiosResponse } from 'axios';
import {ICartProduct} from "../../../types/cart";
import {IProductDocument} from "../../../models/Product";



interface Props {
    dialogRef:RefObject<any>;
    closeDialog:()=>void;
    total:number;
    cartProducts:ICartProduct[];
    products:IProductDocument[];
}

interface inputsState {
    receiver:string;
    address:string;
    phone:string;
}

const CheckoutModal:React.FC<Props> = ({dialogRef, closeDialog, total, products, cartProducts}) => {
    const {data:session} = useSession();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [user, setUser] = useState<null|IUserDocument>(null);
    const [inputs, setInputs] = useState<inputsState>({receiver:"", address:"", phone:""});
    const [payment, setPayment] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string|null>(null);
    const router = useRouter();

    useEffect(()=>{
        const controller = new AbortController();
        const getUserInfo = async () => {      
            if(session===null && dialogRef.current!==null && dialogRef.current.open){
                setIsLoading(false);
                return setErrorMsg("請先登入會員。");
            }
            const {user:savedUser} = await getUser(session?.user._id as string, controller);
            setUser(savedUser);
            setIsLoading(false);
        }
        getUserInfo();
        return ()=> controller.abort();
    },[dialogRef]);

    const paymentChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPayment(()=>e.target.value)
    }

    const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev)=>({...prev,[e.target.name]:e.target.value}));
    }

    const handleInputs = (e:React.ChangeEvent<HTMLInputElement>):void => {
        if(e.target.value==="clear"){
            return setInputs(()=>({receiver:"",address:"",phone:""}))
        }
        if(e.target.value==="fill"){
            if(!user){
                return setErrorMsg("請先登入會員。")
            }
            setInputs(()=>({receiver:user.name, address:user.address, phone:user.phone}));
        }
    }

    const submitHandler = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputs.receiver) return setErrorMsg("請填寫收件人姓名。");
        if (!inputs.phone) return setErrorMsg("請填寫聯絡電話。");
        if (!inputs.address) return setErrorMsg("請填寫收件地址。");
        if(!payment){
            return setErrorMsg("請選擇付款方式。");     
        }
        if(!user){
            return setErrorMsg("請先登入會員");
        }
        // create order
        const {data:orderId}:AxiosResponse<string> = await axiosInstance.post(`/api/order/${user?._id}`,{
            products:products,
            cartProducts:cartProducts,
            amount:total, 
            address:inputs.address, 
            phone:inputs.phone, 
            receiver:inputs.receiver, 
            shipping:shippingFee, 
            payment:{method:"linepay",status:"待付款" }
        });
        

        if(payment==="linepay"){
            router.push({
                pathname:"/payment/linepay/",
                query:{orderId}
            });
        }
        if(payment==="paypal"){
            router.push("/payment/paypal");
        }
    };

  return (
    <>
    <ErrorModal errorMsg={errorMsg} setErrorMsg={setErrorMsg}/>
    <CheckoutContainer ref={dialogRef}>
        <CloseIcon onClick={closeDialog}/>
        {
        isLoading?
        <>Loading</>:
        <Form onSubmit={submitHandler}>
            <FormInner>
                <STitle>寄送資訊</STitle>
                <InputWithLabel type="text" value={inputs.receiver} label="收件人姓名" name="receiver" changeHandler={changeHandler} border="1px solid lightGray"/>
                <InputWithLabel type="text" value={inputs.address} label="寄送地址" name="address" changeHandler={changeHandler} border="1px solid lightGray"/>
                <InputWithLabel type="text" value={inputs.phone} label="連絡電話" name="phone" changeHandler={changeHandler} border="1px solid lightGray"/>
                <FlexBetween>
                    <FlexRow>
                        <Checkbox type="radio" name="fill" value="fill" changeHandler={handleInputs}/>
                        <Label>同會員資料</Label>
                    </FlexRow>
                    <FlexRow>
                        <Checkbox type="radio" name="fill" value="clear" changeHandler={handleInputs}/>
                        <Label>清除填入內容</Label>
                    </FlexRow>
                </FlexBetween>
            </FormInner>
            <FormInner>
                <STitle>選擇付款方式</STitle>
                <FormInnerRow>
                {
                    paymentMethod.map((method,index)=>(
                    <Method key={index}>
                        <PayName>{method.name}</PayName>
                        <PayImgContainer>
                            <Image src={method.img} 
                                   alt={method.name} 
                                   layout="fill" 
                                   objectFit="cover"/>
                        </PayImgContainer>
                        <Checkbox type="radio" name="payment" value={method.value} changeHandler={paymentChange}/>
                    </Method>
                    ))
                }
                </FormInnerRow>
                <Button type="submit" 
                        content="確認結帳"
                        borderRadius="5px" 
                        width="50%" 
                        alignSelf="flex-end"
                        backgroundColor="var(--secondaryColor)"/>
            </FormInner>
        </Form>
        }
    </CheckoutContainer>
    </>
  )
}

export default CheckoutModal;


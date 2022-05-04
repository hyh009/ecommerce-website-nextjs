import React,{useState} from 'react';
import { Container, Title, Description, Form } from './styles';
import { Input } from '../../Form/Input';
import { FixedWidthButton } from '../../Common';
import {MdSend} from "react-icons/md"

const Newsletter:React.FC = () => {
  const [input, setInput] = useState<string>("");

  const changeHandler = (e:React.ChangeEvent<HTMLInputElement>):void=>{
    setInput(e.target.value);
  };

  const submitHandler = (e:React.FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    // email subscribe
  }
  return (
    <Container>
      <Title>訂閱電子報</Title>
      <Description>
        訂閱我們的電子報，優先掌握最新商品及促銷活動資訊。
      </Description>
      <Form onSubmit={submitHandler}>
        <Input type="email" 
              name="email" 
              value={input} 
              placeholder="請輸入Email"
              changeHandler={changeHandler} />
        <FixedWidthButton type="submit" 
                          backgroundColor="var(--primaryColor)" 
                          width="60px" 
                          Icon={MdSend} 
                          color="var(--darkGray)" 
                          fontSize="1.5rem"/>
      </Form>
    </Container>
  )
}

export default Newsletter
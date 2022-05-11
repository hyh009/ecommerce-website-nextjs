import React,{useState, useRef} from 'react';
import {Container, Form} from "./styles";
import {ErrorModal} from "../../Common";
import { Input, Select, TextArea } from '../../Form';
import { Button } from '../../Common';

const options = [
  {
    displayText:"訊息主旨",
    value:"",
  },
  {
    displayText:"產品詢問",
    value:"query",
  },
  {
    displayText:"購物產品(20件以上)",
    value:"purchase",
  },
  {
    displayText:"合作洽談",
    value:"cooperation",
  }
];


const ContactForm = () => {
  const [errorMsg, setErrorMsg] = useState<string|null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  

  const submitHandler = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const info = {
      name:nameRef.current?.value,
      email:emailRef.current?.value,
      subject:subjectRef.current?.value,
      message:messageRef.current?.value
    };
    if(Object.values(info).some((item)=>!item)) return setErrorMsg("請完整填寫表單。");

  }
  return (
    <Container>
      <ErrorModal errorMsg={errorMsg} setErrorMsg={setErrorMsg}/>
      <Form onSubmit={submitHandler}>
        <Input type="text" 
               placeholder="請輸入姓名" 
               name="name"
               border="1px solid lightgray"
               propRef={nameRef}/>
        <Input type="email" 
               placeholder="請輸入聯絡Email" 
               name="name"
               border="1px solid lightgray"
               propRef={emailRef}/>
        <Select options={options} border="1px solid lightgray" propRef={subjectRef}/>
        <TextArea name="message" 
                  propRef={messageRef}
                  placeholder="請輸入給我們的訊息"
                  border="1px solid lightgray"
                  rows={3}/>
        <Button type="submit" content="確定提交" width="100%"/>
      </Form>
    </Container>
  )
}

export default ContactForm
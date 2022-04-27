import React,{ReactNode} from 'react'
import { Container } from './styles'
import {Navbar, Newsletter, Footer} from "../index"

interface Props {
  children : ReactNode
}

const MainLayout:React.FC<Props> = ({children}) => {
  return (
    <Container>
      <Navbar/>
        {children}
      <Newsletter/>
      <Footer/>
    </Container>
  )
}

export default MainLayout
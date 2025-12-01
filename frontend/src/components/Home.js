import {useState} from "react"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import MailForm from "./MailForm";
import Inbox from "./Inbox"

// import EmailEditor from "./MailForm";

const Home=()=> {
  const [toggle,setToggle] = useState(true)
  return (
    <>
   
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand >Welcome to Your Mail Box</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link  onClick={()=>setToggle(true)} >Compose</Nav.Link>
            <Nav.Link onClick={()=>setToggle(false)} >Inbox</Nav.Link>
            
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

   <hr/>
   {toggle ?(<MailForm/>):(<Inbox/>)}
   
    </>



  );
}

export default Home;
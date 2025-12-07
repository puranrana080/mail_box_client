import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import MailForm from "./MailForm";
import Inbox from "./Inbox";
import Sent from "./Sent";

// import EmailEditor from "./MailForm";

const Home = () => {
  const [tab, setTab] = useState("compose");
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Welcome to YourMail Box</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => setTab("compose")}>Compose</Nav.Link>
              <Nav.Link onClick={() => setTab("inbox")}>Inbox</Nav.Link>
              <Nav.Link onClick={() => setTab("sent")}>Sent</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <hr />
      {tab === "compose" && <MailForm />}
      {tab === "inbox" && <Inbox />}
      {tab === "sent" && <Sent />}
    </>
  );
};

export default Home;

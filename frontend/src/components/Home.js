import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import MailForm from "./MailForm";
import Inbox from "./Inbox";
import Sent from "./Sent";
import { useSelector } from "react-redux";


const Home = () => {
  const [tab, setTab] = useState("inbox");
  const count = useSelector((state) => state.mail.unreadCount);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Welcome to YourMail Box</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                active={tab === "compose"}
                onClick={() => setTab("compose")}
              >
                Compose
              </Nav.Link>
              <Nav.Link
                active={tab === "inbox"}
                onClick={() => setTab("inbox")}
              >
                Inbox
                {count > 0 && (
                  <span
                    style={{
                      background: "red",
                      color: "white",
                      borderRadius: "12px",
                      padding: "2px 6px",
                      fontSize: "12px",
                      marginLeft: "6px",
                    }}
                  >
                    {count}
                  </span>
                )}
              </Nav.Link>
              <Nav.Link active={tab === "sent"} onClick={() => setTab("sent")}>
                Sent
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto d-flex align-items-center">
              {/* USER EMAIL */}
              <span className="me-3 fw-bold">
                {localStorage.getItem("email")}
              </span>

              {/* LOGOUT BUTTON */}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("email");
                  window.location.reload();
                }}
              >
                Logout
              </button>
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

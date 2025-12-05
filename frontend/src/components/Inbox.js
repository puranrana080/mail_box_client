import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { StoreContext } from "../storeContext/storeContext.js";

const Inbox = () => {
  const { inboxMails } = useContext(StoreContext);
  console.log(inboxMails);
  return (
    <Container>
      <h1 className="text-primary">Inbox</h1>

      <hr />
      <div>
        {inboxMails.map((mail) => (
          <div
            key={mail._id}
            className="d-flex align-items-center p-2 border-bottom"
            style={{ cursor: "pointer" }}
          >
            {/* LEFT: From Email */}
            <div style={{ width: "250px", fontWeight: "bold" }}>
              {mail.from?.email}
            </div>

            {/* SUBJECT — starts from middle area */}
            <div style={{ flexBasis: "70%" }}>{mail.subject}</div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Inbox;

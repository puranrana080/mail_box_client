import React, { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { StoreContext } from "../storeContext/storeContext.js";
import axios from "axios";

const Inbox = () => {
  const { inboxMails, setInboxMails } = useContext(StoreContext);
  let userEmail = localStorage.getItem("email");
  const [selectedMail, setSelectedMail] = useState(null);
  console.log("sdfs", inboxMails);

  const unreadCount = inboxMails.filter((mail) => {
    const recipient = mail.to.find((t) => t.email === userEmail);
    return recipient && !recipient.isRead;
  }).length;

  if (selectedMail) {
    return (
      <Container>
        <button
          className="btn btn-sm btn-outline-secondary mb-3"
          onClick={() => setSelectedMail(null)}
        >
          ⬅ Back
        </button>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ margin: 0 }}>{selectedMail.subject}</h3>

          <span style={{ fontSize: "14px", color: "gray" }}>
            {new Date(selectedMail.createdAt).toLocaleString()}
          </span>
        </div>

        <hr />
        <p>
          <strong>From:</strong> {selectedMail.from.email}
        </p>

        <div className="d-flex " style={{ marginBottom: "20px" }}>
          <div>
            <strong>To:</strong>
          </div>
          <div style={{ marginLeft: "25px" }}>
            {selectedMail.to.map((m) => (
              <p key={m.email} style={{ margin: 0 }}>
                {m.email}
              </p>
            ))}
          </div>
        </div>

        {/* Render HTML body */}
        <div
          dangerouslySetInnerHTML={{ __html: selectedMail.contentHTML }}
        ></div>
      </Container>
    );
  }

  const handleMailClick = async (mail) => {
    setSelectedMail(mail);

    const userEmail = localStorage.getItem("email");

    const recipient = mail.to.find((t) => t.email === userEmail);

    if (recipient.isRead) return;

    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:4000/api/mail/mark-read/${mail._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update UI without reloading
      recipient.isRead = true;
      setInboxMails([...inboxMails]); // Refresh UI
    } catch (err) {
      console.log("Error marking mail as read", err);
    }
  };

  return (
    <Container>
      <h1 className="text-dark">
        Inbox{unreadCount > 0 && <span>({unreadCount} unread)</span>}
      </h1>
      <hr />

      {/* <div> */}
      {inboxMails.map((mail) => {
        const recipient = mail.to.find((t) => t.email === userEmail);
        const isRead = recipient?.isRead;

        return (
          <div
            key={mail._id}
            className="d-flex align-items-center p-2 border-bottom"
            style={{ cursor: "pointer" }}
            onClick={() => handleMailClick(mail)}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                marginRight: "10px",

                backgroundColor: isRead ? "transparent" : "#08c9ebff",
              }}
            ></div>
            {/* LEFT: From Email */}
            <div style={{ width: "250px", fontWeight: "bold" }}>
              {mail.from?.email}
            </div>

            {/* SUBJECT — starts from middle area */}
            <div style={{ flexBasis: "70%" }}>{mail.subject}</div>
          </div>
        );
      })}
    </Container>
  );
};

export default Inbox;

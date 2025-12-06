import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import { setInboxMails } from "../redux/slice/inboxSlice";

const Inbox = () => {
  const inboxMails = useSelector((state) => state.mail.inboxMails);
  const dispatch = useDispatch();
  let userEmail = localStorage.getItem("email");
  const [selectedMail, setSelectedMail] = useState(null);
  console.log("sdfs", inboxMails);

  const unreadCount = inboxMails.filter((mail) => {
    const recipient = mail.to.find((t) => t.email === userEmail);
    return recipient && !recipient.isRead;
  }).length;

  useEffect(() => {
    async function fetchInboxMails() {
      try {
        const token = localStorage.getItem("token");
        let response = await axios.get(
          "http://localhost:4000/api/mail/inboxMail",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        dispatch(setInboxMails(response.data.inbox));

        console.log("Inbox Mails", response);
      } catch (error) {
        console.log("Error fetching Inbox mails,", error);
      }
    }
    fetchInboxMails();
  }, [dispatch]);

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

      const updatedInbox = inboxMails.map((m) => {
        if (m._id !== mail._id) return m;

        return {
          ...m,
          to: m.to.map((t) =>
            t.email === userEmail ? { ...t, isRead: true } : t
          ),
        };
      });

      dispatch(setInboxMails(updatedInbox));
    } catch (err) {
      console.log("Error marking mail as read", err);
    }
  };

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
            <div
              style={{ width: "250px", fontWeight: isRead ? "normal" : "bold" }}
            >
              {mail.from?.email}
            </div>

            {/* SUBJECT — starts from middle area */}
            <div
              style={{
                flexBasis: "70%",
                fontWeight: isRead ? "normal" : "bold",
              }}
            >
              {mail.subject}
            </div>
          </div>
        );
      })}
    </Container>
  );
};

export default Inbox;

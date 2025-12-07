import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
// import { RiDeleteBinFill } from "react-icons/ri";
// import { OverlayTrigger, Tooltip } from "react-bootstrap";
import MailList from "./MailList";
import ViewMail from "./ViewMail";

import axios from "axios";
import { setInboxMails, deleteInboxMail } from "../redux/slice/inboxSlice";

const Inbox = () => {
  const inboxMails = useSelector((state) => state.mail.inboxMails);
  const dispatch = useDispatch();
  let userEmail = localStorage.getItem("email");
  const [selectedMail, setSelectedMail] = useState(null);

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
  const handleDelete = async (mail) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `http://localhost:4000/api/mail/delete/${mail._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch(deleteInboxMail(mail._id));
    } catch (error) {
      console.log("Delete mail error:", error);
    }
  };

  if (selectedMail) {
    return (
      <>

        <ViewMail
          mail={selectedMail}
          onClickMail={() => setSelectedMail(null)}
        />
      </>
    );
  }

  return (
    <Container>
      <h1 className="text-dark">
        Inbox{unreadCount > 0 && <span>({unreadCount} unread)</span>}
      </h1>
      <hr />

      {/* <div> */}
      <MailList
        mails={inboxMails}
        userEmail={userEmail}
        type="inbox"
        onClickMail={handleMailClick}
        onDeleteMail={handleDelete}
      />
    </Container>
  );
};

export default Inbox;

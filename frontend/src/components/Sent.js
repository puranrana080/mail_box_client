import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import MailList from "./MailList";
import ViewMail from "./ViewMail";
import { setSentMails } from "../redux/slice/inboxSlice";

const Sent = () => {
  const sentMails = useSelector((state) => state.mail.sentMails);
  const dispatch = useDispatch();
  const [selectedMail, setSelectedMail] = useState(null);
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    async function fetchSentMails() {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:4000/api/mail/sentMail", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setSentMails(res.data.sent));
    }
    fetchSentMails();
  }, [dispatch]);

  const handleMailClick = async (mail) => {
    setSelectedMail(mail);
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
      <h1>Sent Mails</h1>
      <hr />
      <MailList
        mails={sentMails}
        userEmail={userEmail}
        type="sent"
        onClickMail={handleMailClick}
        // onDeleteMail={() => {}}
      />
    </Container>
  );
};

export default Sent;

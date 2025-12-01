import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";

const MailForm = () => {
  const token = localStorage.getItem("token");
  const [content, setContent] = useState("");

  const recepientRef = useRef();
  const subjectRef = useRef();

  const sendMailHandler = async (event) => {
    event.preventDefault();

    const enteredRecepient = recepientRef.current.value;

    const recipientsArray = enteredRecepient
      .split(" ")
      .map((email) => email.trim())
      .filter((email) => email !== "");
    const enteredSubject = subjectRef.current.value;
    const enteredMessage = content;

    console.log(
      "Full Email data",
      recipientsArray,
      enteredSubject,
      enteredMessage
    );

    try {
      const response = await axios.post(
        "http://localhost:4000/api/mail/sendMail",
        {
          to: recipientsArray,
          subject: enteredSubject,
          message: enteredMessage,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Mail Send");
      
      console.log("Mail sent:", response.data);
      recepientRef.current.value = "";
    subjectRef.current.value = "";
    setContent("");

    } catch (error) {
      console.log("Error sending mail", error);
    }
  };

  const config = {
    toolbarAdaptive: false,
    buttons: [
      "bold",
      "italic",
      "underline",

      "|",
      "font",
      "fontsize",
      "|",
      "ul",
      "ol",
      "|",
      "brush",
      "|",
      "lineHeight",
      "|",
      "ul",
      "ol",
      "|",
      "hr",
      "undo",
      "redo",
      "fullsize",
    ],
    height: 400,
  };

  return (
    <>
      <Container>
        <Form onSubmit={sendMailHandler}>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">To</InputGroup.Text>
            <Form.Control
              placeholder="Recepiant email"
              aria-label="email"
              type="text"
              ref={recepientRef}
              aria-describedby="basic-addon1"
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="email-subject">Subject</InputGroup.Text>
            <Form.Control
              placeholder="Subject"
              aria-label="subject"
              type="text"
              ref={subjectRef}
              aria-describedby="email-subject"
            />
          </InputGroup>

          <JoditEditor
            config={config}
            value={content}
            onBlur={(newContent) => {
              setContent(newContent);
            }}
          />

          <Button
            variant="outline-primary"
            className="rounded-pill mt-2"
            type="submit"
          >
            Send
          </Button>
        </Form>
      </Container>
    </>
  );
};
export default MailForm;

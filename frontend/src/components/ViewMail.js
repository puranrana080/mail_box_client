import React from "react";
import { Container } from "react-bootstrap";

const ViewMail = ({ mail, onClickMail }) => {
  return (
    <Container>
      <button
        className="btn btn-sm btn-outline-secondary mb-3"
        onClick={onClickMail}
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
        <h3 style={{ margin: 0 }}>{mail.subject}</h3>

        <span style={{ fontSize: "14px", color: "gray" }}>
          {new Date(mail.createdAt).toLocaleString()}
        </span>
      </div>

      <hr />
      <p>
        <strong>From:</strong> {mail.from.email}
      </p>

      <div className="d-flex " style={{ marginBottom: "20px" }}>
        <div>
          <strong>To:</strong>
        </div>
        <div style={{ marginLeft: "25px" }}>
          {mail.to.map((m) => (
            <p key={m.email} style={{ margin: 0 }}>
              {m.email}
            </p>
          ))}
        </div>
      </div>

      {/* Render HTML body */}
      <div
        style={{
          paddingLeft: "30px",
          marginTop: "10px",
        }}
        dangerouslySetInnerHTML={{ __html: mail.contentHTML }}
      ></div>
      <hr />
    </Container>
  );
};

export default ViewMail;

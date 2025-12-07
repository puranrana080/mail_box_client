import React from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const MailList = ({
  mails,
  userEmail,
  onClickMail,
  onDeleteMail,
  type, // "inbox" | "sent"
}) => {
  return (
    <>
      {mails.map((mail) => {
        const recipient = mail.to.find((t) => t.email === userEmail);
        const isRead = type === "inbox" ? recipient?.isRead : true;

        return (
          <div
            key={mail._id}
            className="d-flex align-items-center p-2 border-bottom"
          >
            {/* unread dot only for inbox */}
            {type === "inbox" && (
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  marginRight: "10px",
                  backgroundColor: isRead ? "transparent" : "#08c9ebff",
                }}
              ></div>
            )}

            {/* LEFT COLUMN */}
            <div
              style={{
                width: "250px",
                cursor: "pointer",
                fontWeight: isRead ? "normal" : "bold",
              }}
              onClick={() => onClickMail(mail)}
            >
              {type === "inbox"
                ? mail.from.email
                : mail.to.map((t) => t.email).join(", ")}
            </div>

            {/* SUBJECT */}
            <div
              onClick={() => onClickMail(mail)}
              style={{
                flexBasis: "70%",
                fontWeight: isRead ? "normal" : "bold",
                cursor: "pointer",
              }}
            >
              {mail.subject}
            </div>

            {/* DELETE */}
            {type === "inbox" && (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="tooltip-delete">Delete</Tooltip>}
              >
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => onDeleteMail(mail)}
                >
                  <RiDeleteBinFill />
                </div>
              </OverlayTrigger>
            )}
          </div>
        );
      })}
    </>
  );
};

export default MailList;

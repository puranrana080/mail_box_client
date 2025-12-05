import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  const [inboxMails, setInboxMails] = useState([]);

  useEffect(() => {
    async function fetchInboxMails() {
      try {
        const token = localStorage.getItem("token");
        let response = await axios.get(
          "http://localhost:4000/api/mail/inboxMail",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setInboxMails(response.data.inbox);
        console.log("Inbox Mails", response);
      } catch (error) {
        console.log("Error fetching Inbox mails,", error);
      }
    }
    fetchInboxMails();
  }, []);

  return (
    <StoreContext.Provider value={{ inboxMails }}>
      {children}
    </StoreContext.Provider>
  );
};

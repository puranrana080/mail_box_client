import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inboxMails: [],
  sentMails: [],
   unreadCount: 0,
};
export const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    setInboxMails: (state, action) => {
      state.inboxMails = action.payload;
    },
    setSentMails: (state, action) => {
      state.sentMails = action.payload;
    },
    setUnreadCount:(state,action)=>{
        state.unreadCount=action.payload;
    },
    deleteInboxMail: (state, action) => {
      const mailId = action.payload;
      state.inboxMails = state.inboxMails.filter((mail) => mail._id !== mailId);
    },
  },
});
export const { setInboxMails, setSentMails, deleteInboxMail, setUnreadCount } =
  inboxSlice.actions;
export default inboxSlice.reducer;

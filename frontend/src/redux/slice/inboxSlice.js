import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inboxMails: [],
};
export const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    setInboxMails: (state, action) => {
      state.inboxMails = action.payload;
    },
    deleteInboxMail: (state, action) => {
      const mailId = action.payload;
      state.inboxMails = state.inboxMails.filter((mail) => mail._id !== mailId);
    },
  },
});
export const { setInboxMails, deleteInboxMail } = inboxSlice.actions;
export default inboxSlice.reducer;

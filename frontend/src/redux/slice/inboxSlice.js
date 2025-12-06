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
  },
});
export const { setInboxMails } = inboxSlice.actions;
export default inboxSlice.reducer;

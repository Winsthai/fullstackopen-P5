import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: null, color: null };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    updateNotification(state, action) {
      return action.payload;
    },
    removeNotification() {
      return initialState;
    },
  },
});

export const { updateNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (content, color, seconds) => {
  return async (dispatch) => {
    dispatch(updateNotification({ message: content, color: color }));
    setTimeout(() => {
      dispatch(removeNotification());
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer;

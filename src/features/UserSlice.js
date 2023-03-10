import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
  },
  reducers: {
    loginUser: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      const newState = { name: action.payload.user };
      return newState;
    },
  },
});

export const { loginUser } = userSlice.actions;

export default userSlice.reducer;

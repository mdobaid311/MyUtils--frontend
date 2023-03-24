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
    signupUser: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      const newState = { name: action.payload.user };
      return newState;
    },
    logoutUser: (state) => {
      localStorage.removeItem("token");
      return { name: "" };
    },
  },
});

export const { loginUser, logoutUser ,signupUser} = userSlice.actions;

export default userSlice.reducer;

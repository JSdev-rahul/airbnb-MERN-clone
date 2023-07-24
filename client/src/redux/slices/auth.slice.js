import { createSlice } from "@reduxjs/toolkit";
import { authAsyncThunk } from "../asyncThunk/auth.asyncThunk";

const initialState = {
  status: null,
  user: null,
  token: null,
};

const AuthSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    removeToken: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authAsyncThunk.loginAsyncThunk.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(
      authAsyncThunk.loginAsyncThunk.fulfilled,
      (state, action) => {
        console.log("action", action);
        state.status = "fullfiled";
        state.token = action.payload.token;
        state.user = action.payload;
        console.log("action", action);
      }
    );
    builder.addCase(
      authAsyncThunk.loginAsyncThunk.rejected,
      (state, action) => {
        state.status = "rejected";
      }
    );
  },
});

export const { removeToken } = AuthSlice.actions;
export const authState = (state) => AuthSlice;
export default AuthSlice.reducer;

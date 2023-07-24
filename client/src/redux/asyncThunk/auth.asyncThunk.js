import { createAsyncThunk } from "@reduxjs/toolkit";
import { ASYNC_ROUTES } from "../reduxConstant/redux.constant";
import { AuthService } from "../services/auth.service";

export class AuthAsyncThunk {
  constructor() {
    this.authService = new AuthService();
  }

  loginAsyncThunk = createAsyncThunk(
    ASYNC_ROUTES.LOGIN,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await this.authService.loginService(payload);
        return response;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  userSignUpAsyncThunk = createAsyncThunk(
    ASYNC_ROUTES.SIGN_UP,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await this.authService.userSignUpService(payload);
        return response;
      } catch (err) {
        console.log("err", err);
        return rejectWithValue(err);
      }
    }
  );
}

export const authAsyncThunk = new AuthAsyncThunk();

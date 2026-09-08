/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

export interface User {
  name?: string;
  email: string;
  phone?: string;
  userId: string;
  role: string;
  accessToken?: string;
  refreshToken?: string;
}

interface AuthState {
  user: Partial<User> | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      let decode: any = {};
      const token = action.payload?.accessToken || action.payload?.token;
      if (token) {
        try {
          decode = jwtDecode(token);
        } catch {
          // ignore decode errors if invalid
        }
      }

      const email =
        action.payload?.user?.email ||
        decode?.email ||
        decode?.useremail ||
        state.user?.email ||
        "";

      const userId =
        action.payload?.user?._id ||
        action.payload?.user?.userId ||
        decode?.userId ||
        decode?._id ||
        decode?.id ||
        state.user?.userId ||
        "";

      const role =
        action.payload?.user?.role ||
        decode?.role ||
        state.user?.role ||
        "user";

      const name =
        action.payload?.user?.name ||
        decode?.name ||
        state.user?.name ||
        "";

      state.user = {
        name,
        email,
        userId,
        role,
        accessToken: token || state.user?.accessToken,
        refreshToken: action.payload?.refreshToken || state.user?.refreshToken,
      };
    },
    logOut: (state) => {
      state.user = null;
    },
  },
});

export const { logOut, setUser } = authSlice.actions;
export default authSlice.reducer;

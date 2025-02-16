import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";

export type TUSer = {
  email: string;
  role: string;
  name: string;

  iat: number;
  exp: number;
};
type TinitialState = {
  user: null | TUSer;
  token: null | string;
};

const initialState: TinitialState = {
  user: null,
  token: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.token = token;
      state.user = user;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
export const useCurrentUser = (state: RootState) => state.auth.user;
export const useCurrentToken = (state: RootState) => state.auth.token;

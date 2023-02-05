import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../utils/types";

interface UserState {
  user?: User;
  token: string;
}

const initialState: UserState = {
  user: undefined,
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    resetUser: (state) => {
      state.user = undefined;
      state.token = "";
    },
    updateUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
    },
  },
});

const { reducer, actions } = userSlice;

export const { updateUser, resetUser, setUser } = actions;

export default reducer;

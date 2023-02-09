import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Class } from "../utils/types";

interface ClassState {
  classes: Array<Class>;
}

const initialState: ClassState = {
  classes: [],
};

const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    setClass: (state, action: PayloadAction<ClassState>) => {
      state.classes = action.payload.classes;
    },
  },
});

const { reducer, actions } = classSlice;

export const { setClass } = actions;

export default reducer;

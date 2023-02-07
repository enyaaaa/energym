import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Instructor } from "../utils/types";

interface InstructorState {
  instructor?: Instructor;
  token: string;
  code: string;
}

const initialState: InstructorState = {
  instructor: undefined,
  token: "",
  code: "Q6FfficNa7vfXzHP5LSMB06iu2sJuXh"
};

const instructorSlice = createSlice({
  name: "instructor",
  initialState,
  reducers: {
    setInstructor: (state, action: PayloadAction<InstructorState>) => {
      state.instructor = action.payload.instructor;
      state.token = action.payload.token;
    },
    resetInstructor: (state) => {
      state.instructor = undefined;
      state.token = "";
      state.code = "";
    },
    updateInstructor: (state, action: PayloadAction<InstructorState>) => {
      state.instructor = action.payload.instructor;
    },
  },
});

const { reducer, actions } = instructorSlice;

export const { updateInstructor, resetInstructor, setInstructor } = actions;

export default reducer;

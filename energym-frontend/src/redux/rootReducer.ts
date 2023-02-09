import { combineReducers } from "@reduxjs/toolkit";
import UserReducer from "./userSlice";
import InstructorReducer from "./instructorSlice";
import ClassReducer from "./classSlice";

export default combineReducers({
  user: UserReducer,
  instructor: InstructorReducer,
  class: ClassReducer,
});

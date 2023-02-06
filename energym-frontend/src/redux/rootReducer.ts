import { combineReducers } from "@reduxjs/toolkit";
import UserReducer from "./userSlice";
import InstructorReducer from "./instructorSlice";

export default combineReducers({
    user: UserReducer,
    instructor: InstructorReducer
})
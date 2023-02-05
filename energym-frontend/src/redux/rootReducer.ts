import { combineReducers } from "@reduxjs/toolkit";
import UserReducer from "./userSlice";

export default combineReducers({
    user: UserReducer
})
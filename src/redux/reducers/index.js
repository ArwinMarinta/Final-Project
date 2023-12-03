import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import courseReducer from "./CourseReducer";

export default combineReducers({
  auth: authReducer,
  course: courseReducer,
});

import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import courseReducer from "./CourseReducer";
import DetailReducer from "./DetailReducer";
// import PopUpReducer from "./PopUpReducer";

export default combineReducers({
  auth: authReducer,
  course: courseReducer,
  detail: DetailReducer,
  // popup: PopUpReducer,
});

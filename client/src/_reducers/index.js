import { combineReducers } from "redux";
import user from "./user_reducer";
import data from "./data_reducer";
import upload from "./upload_reducer";
import dashboard from "./dashboard_reducer";

const rootReducer = combineReducers({
    user,
    data,
    upload,
    dashboard,
});

export default rootReducer;

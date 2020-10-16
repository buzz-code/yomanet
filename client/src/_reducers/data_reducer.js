import { uploadFile } from "../_actions/data_actions";
import { FETCH_DATA, UPLOAD_FILE } from "../_actions/types";

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_DATA:
            return { ...state, data: action.payload };
        case UPLOAD_FILE:
            return { ...state };
        default:
            return state;
    }
}

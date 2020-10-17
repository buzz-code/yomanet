import { UPLOAD_FILE } from "../_actions/types";

export default function (state = {}, action) {
    switch (action.type) {
        case UPLOAD_FILE:
            return { ...state };
        default:
            return state;
    }
}

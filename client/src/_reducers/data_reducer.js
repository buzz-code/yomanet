import { FETCH_DATA, GET_REPORT_DATA } from "../_actions/types";

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_DATA:
        case GET_REPORT_DATA:
            return { ...state, data: action.payload };
        default:
            return state;
    }
}

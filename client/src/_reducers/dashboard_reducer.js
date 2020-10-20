import { GET_DASHBOARD_DATA } from "../_actions/types";

export default function (state = {}, action) {
    switch (action.type) {
        case GET_DASHBOARD_DATA:
            return { ...state, charts: action.payload };
        default:
            return state;
    }
}

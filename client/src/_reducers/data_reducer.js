import { FETCH_DATA } from "../_actions/types";

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_DATA:
            return { ...state, data: action.payload };
        default:
            return state;
    }
}

import { GET_GRAPH_DATA } from "../_actions/types";

export default function (state = {}, action) {
    switch (action.type) {
        case GET_GRAPH_DATA:
            return { ...state, data: action.payload };
        default:
            return state;
    }
}

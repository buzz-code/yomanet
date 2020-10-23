import axios from "axios";
import { GET_GRAPH_DATA } from "./types";
import { GRAPH_SERVER } from "../components/Config.js";
import { getFilterFromParams } from "./utils";

export function getGraphData(url, params) {
    const filter = getFilterFromParams(params);
    const request = axios.post(`${GRAPH_SERVER}/${url}`, { filter }).then((response) => response.data);

    return {
        type: GET_GRAPH_DATA,
        payload: request,
    };
}

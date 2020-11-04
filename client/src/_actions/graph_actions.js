import axios from "axios";
import { GET_GRAPH_DATA, GET_REPORT_DATA } from "./types";
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

export function reportGraphData(url, params) {
    const filter = getFilterFromParams(params);
    const path = `${GRAPH_SERVER}/${url}?filter=${filter}`;
    window.open(path, "_blank");

    return {
        type: GET_REPORT_DATA,
    };
}

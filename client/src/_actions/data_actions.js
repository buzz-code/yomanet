import axios from "axios";
import { FETCH_DATA, GET_REPORT_DATA, SEND_DATA_BY_EMAIL } from "./types";
import { DATA_SERVER } from "../components/Config.js";
import { getFilterFromParams } from "./utils";

export function getData(url, params) {
    const filter = getFilterFromParams(params);
    const request = axios.post(`${DATA_SERVER}/${url}`, { filter }).then((response) => response.data);

    return {
        type: FETCH_DATA,
        payload: request,
    };
}

export function sendReportByEmail(recipient, url, params) {
    const filter = getFilterFromParams(params);
    const request = axios.put(`${DATA_SERVER}/${url}`, { filter, recipient }).then((response) => response.data);

    return {
        type: SEND_DATA_BY_EMAIL,
        payload: request,
    };
}

export function reportData(url, params) {
    const filter = getFilterFromParams(params);
    const path = `${DATA_SERVER}/${url}?filter=${filter}`;
    window.open(path, "_blank");

    return {
        type: GET_REPORT_DATA,
    };
}

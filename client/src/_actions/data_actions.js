import axios from "axios";
import { FETCH_DATA, GET_REPORT_DATA, SEND_DATA_BY_EMAIL, LOAD_FILE } from "./types";
import { DATA_SERVER, FILES_SERVER } from "../components/Config.js";
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
    const request = axios
        .put(`${DATA_SERVER}/${url}`, { filter, recipient }, { timeout: 4 * 60 * 1000 })
        .then((response) => response.data);

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

export function getFilesData(url) {
    const request = axios.get(`${FILES_SERVER}/${url}`).then((response) => response.data);

    return {
        type: FETCH_DATA,
        payload: request,
    };
}

export function loadFile(url, fullPath) {
    const request = axios
        .post(`${FILES_SERVER}/${url}`, { fullPath }, { timeout: 4 * 60 * 1000 })
        .then((response) => response.data);

    return {
        type: LOAD_FILE,
        payload: request,
    };
}

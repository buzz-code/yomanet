import axios from "axios";
import { FETCH_DATA, GET_REPORT_DATA } from "./types";
import { DATA_SERVER } from "../components/Config.js";

function getFilterFromParams(params) {
    const filter = {};
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const element = params[key];
            if (
                element === undefined ||
                element === null ||
                element === "" ||
                (Array.isArray(element) && element.length === 0)
            ) {
                //do not use it
            } else {
                filter[key] = element;
            }
        }
    }

    return JSON.stringify(filter);
}

export function getData(url, params) {
    const filter = getFilterFromParams(params);
    const request = axios.post(`${DATA_SERVER}/${url}`, { filter }).then((response) => response.data);

    return {
        type: FETCH_DATA,
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

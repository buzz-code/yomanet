import axios from "axios";
import { GET_REPORT_DATA } from "./types";
import { REPORT_SERVER } from "../components/Config.js";

export function getListeningByKlassAndLesson(params) {
    const request = axios.post(`${REPORT_SERVER}/listeningByKlassAndLesson`, params).then((response) => response.data);

    return {
        type: GET_REPORT_DATA,
        payload: request,
    };
}

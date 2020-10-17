import axios from "axios";
import { GET_LIST } from "./types";
import { LIST_SERVER } from "../components/Config.js";

export function getLessonList(term) {
    const request = axios.post(`${LIST_SERVER}/lesson`, { term }).then((response) => response.data);

    return {
        type: GET_LIST,
        payload: request,
    };
}

export function getKlassList(term) {
    const request = axios.post(`${LIST_SERVER}/klass`, { term }).then((response) => response.data);

    return {
        type: GET_LIST,
        payload: request,
    };
}

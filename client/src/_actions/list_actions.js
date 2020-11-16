import axios from "axios";
import { GET_LIST } from "./types";
import { LIST_SERVER } from "../components/Config.js";

export function getLessonList(term, klass) {
    if (klass && klass.length) {
        klass = klass.map((item) => item.label).join("|");
    }
    const request = axios.post(`${LIST_SERVER}/lesson`, { term, klass }).then((response) => response.data);

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

export function getMegamaList(term) {
    const request = axios.post(`${LIST_SERVER}/megama`, { term }).then((response) => response.data);

    return {
        type: GET_LIST,
        payload: request,
    };
}

export function getStudentList(term) {
    const request = axios.post(`${LIST_SERVER}/student`, { term }).then((response) => response.data);

    return {
        type: GET_LIST,
        payload: request,
    };
}

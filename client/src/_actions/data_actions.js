import axios from "axios";
import { FETCH_DATA } from "./types";
import { DATA_SERVER } from "../components/Config.js";

export function getListeningData(params) {
    const request = axios.post(`${DATA_SERVER}/listening`, params).then((response) => response.data);

    return {
        type: FETCH_DATA,
        payload: request,
    };
}

export function getLessonData(params) {
    const request = axios.post(`${DATA_SERVER}/lesson`, params).then((response) => response.data);

    return {
        type: FETCH_DATA,
        payload: request,
    };
}

export function getStudentData(params) {
    const request = axios.post(`${DATA_SERVER}/student`, params).then((response) => response.data);

    return {
        type: FETCH_DATA,
        payload: request,
    };
}

export function getConfData(params) {
    const request = axios.post(`${DATA_SERVER}/conf`, params).then((response) => response.data);

    return {
        type: FETCH_DATA,
        payload: request,
    };
}

export function getUserData(params) {
    const request = axios.post(`${DATA_SERVER}/user`, params).then((response) => response.data);

    return {
        type: FETCH_DATA,
        payload: request,
    };
}

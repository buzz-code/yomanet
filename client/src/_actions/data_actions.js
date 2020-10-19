import axios from "axios";
import { FETCH_DATA } from "./types";
import { DATA_SERVER } from "../components/Config.js";

export function getData(type, params) {
    const request = axios.post(getUrlPerType(type), params).then((response) => response.data);

    return {
        type: FETCH_DATA,
        payload: request,
    };
}

export function deleteData(type, params) {
    const request = axios.delete(getUrlPerType(type), params).then((response) => response.data);

    return {
        type: FETCH_DATA,
        payload: request,
    };
}

function getUrlPerType(type) {
    const config = {
        listening: `${DATA_SERVER}/listening`,
        lesson: `${DATA_SERVER}/lesson`,
        student: `${DATA_SERVER}/student`,
        conf: `${DATA_SERVER}/conf`,
        user: `${DATA_SERVER}/user`,
    };
    return config[type];
}

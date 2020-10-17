import axios from "axios";
import { FETCH_DATA, UPLOAD_FILE } from "./types";
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

export function uploadListeningFile(file) {
    const formData = new FormData();
    formData.append("fileUpload", file, file);
    const request = axios.post(`${DATA_SERVER}/upload/listening`, formData).then((response) => response.data);

    return {
        type: UPLOAD_FILE,
        payload: request,
    };
}

export function uploadLessonFile(file) {
    const formData = new FormData();
    formData.append("fileUpload", file, file);
    const request = axios.post(`${DATA_SERVER}/upload/lesson`, formData).then((response) => response.data);

    return {
        type: UPLOAD_FILE,
        payload: request,
    };
}

export function uploadStudentFile(file) {
    const formData = new FormData();
    formData.append("fileUpload", file, file);
    const request = axios.post(`${DATA_SERVER}/upload/student`, formData).then((response) => response.data);

    return {
        type: UPLOAD_FILE,
        payload: request,
    };
}

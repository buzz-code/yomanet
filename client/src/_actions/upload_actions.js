import axios from "axios";
import { UPLOAD_FILE } from "./types";
import { UPLOAD_SERVER } from "../components/Config.js";

export function uploadListeningFile(file) {
    const formData = new FormData();
    formData.append("fileUpload", file, file);
    const request = axios.post(`${UPLOAD_SERVER}/listening`, formData).then((response) => response.data);

    return {
        type: UPLOAD_FILE,
        payload: request,
    };
}

export function uploadLessonFile(file) {
    const formData = new FormData();
    formData.append("fileUpload", file, file);
    const request = axios.post(`${UPLOAD_SERVER}/lesson`, formData).then((response) => response.data);

    return {
        type: UPLOAD_FILE,
        payload: request,
    };
}

export function uploadStudentFile(file) {
    const formData = new FormData();
    formData.append("fileUpload", file, file);
    const request = axios.post(`${UPLOAD_SERVER}/student`, formData).then((response) => response.data);

    return {
        type: UPLOAD_FILE,
        payload: request,
    };
}

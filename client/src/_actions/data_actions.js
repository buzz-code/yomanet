import axios from "axios";
import { FETCH_DATA, UPLOAD_FILE } from "./types";
import { DATA_SERVER } from "../components/Config.js";

export function getData(params) {
    const request = axios.post(`${DATA_SERVER}/`, params).then((response) => response.data);

    return {
        type: FETCH_DATA,
        payload: request,
    };
}

export function uploadFile(file) {
    const formData = new FormData();
    formData.append("fileUpload", file, file);
    const request = axios.post(`${DATA_SERVER}/upload`, formData).then((response) => response.data);

    return {
        type: UPLOAD_FILE,
        payload: request,
    };
}

// export function loginUser(dataToSubmit) {
//     const request = axios.post(`${USER_SERVER}/login`, dataToSubmit).then((response) => response.data);

//     return {
//         type: LOGIN_USER,
//         payload: request,
//     };
// }

// export function auth() {
//     const request = axios.get(`${USER_SERVER}/auth`).then((response) => response.data);

//     return {
//         type: AUTH_USER,
//         payload: request,
//     };
// }

// export function logoutUser() {
//     const request = axios.get(`${USER_SERVER}/logout`).then((response) => response.data);

//     return {
//         type: LOGOUT_USER,
//         payload: request,
//     };
// }

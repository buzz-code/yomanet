import axios from "axios";
import { UPLOAD_FILE } from "./types";
import { UPLOAD_SERVER } from "../components/Config.js";

export function uploadFile(url, file) {
    const formData = new FormData();
    formData.append("fileUpload", file, file.name);
    const request = axios.post(`${UPLOAD_SERVER}/${url}`, formData).then((response) => response.data);

    return {
        type: UPLOAD_FILE,
        payload: request,
    };
}

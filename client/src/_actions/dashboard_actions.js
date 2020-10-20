import axios from "axios";
import { GET_DASHBOARD_DATA } from "./types";
import { DASHBOARD_SERVER } from "../components/Config.js";

export function getDashboardData() {
    const request = axios.get(`${DASHBOARD_SERVER}/`).then((response) => response.data);

    return {
        type: GET_DASHBOARD_DATA,
        payload: request,
    };
}

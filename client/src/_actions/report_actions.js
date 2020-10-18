import axios from "axios";
import { GET_REPORT_DATA } from "./types";
import { REPORT_SERVER } from "../components/Config.js";
import queryString from "query-string";

export function getPDFListeningByKlassAndLesson(params) {
    params = {
        ...params,
        klass: params.klass && params.klass.length ? params.klass.map((item) => item.value).join("|") : undefined,
        lesson: params.lesson && params.lesson.length ? params.lesson.map((item) => item.value).join("|") : undefined,
    };

    const url = `${REPORT_SERVER}/pdf/listeningByKlassAndLesson?${queryString.stringify(params)}`;
    window.open(url, "_blank");

    return {
        type: GET_REPORT_DATA,
    };
}

export function getPDFListeningByKlass(params) {
    params = {
        ...params,
        klass: params.klass && params.klass.length ? params.klass.map((item) => item.value).join("|") : undefined,
    };

    const url = `${REPORT_SERVER}/pdf/listeningByKlass?${queryString.stringify(params)}`;
    window.open(url, "_blank");

    return {
        type: GET_REPORT_DATA,
    };
}

export function getPDFConfByKlass(params) {
    params = {
        ...params,
        klass: params.klass && params.klass.length ? params.klass.map((item) => item.value).join("|") : undefined,
    };

    const url = `${REPORT_SERVER}/pdf/confByKlass?${queryString.stringify(params)}`;
    window.open(url, "_blank");

    return {
        type: GET_REPORT_DATA,
    };
}

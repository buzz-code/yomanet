import React from "react";
import { getStudentData } from "../../../_actions/data_actions";
import DataPage from "./TableDataPage";

function StudentData() {
    return <DataPage getData={getStudentData} />;
}

export default StudentData;

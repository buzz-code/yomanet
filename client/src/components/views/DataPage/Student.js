import React from "react";
import { getStudentData } from "../../../_actions/data_actions";
import TableData from "./TableData";

function Student() {
    return <TableData getData={getStudentData} type="student" />;
}

export default Student;

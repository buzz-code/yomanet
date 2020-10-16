import React from "react";
import { uploadStudentFile } from "../../../_actions/data_actions";
import Upload from "./Upload";

function Student(props) {
    return <Upload uploadFile={uploadStudentFile} {...props}/>;
}

export default Student;

import React from "react";
import { uploadStudentFile } from "../../../_actions/upload_actions";
import Upload from "./Upload";

function Student(props) {
    return <Upload uploadFile={uploadStudentFile} {...props}/>;
}

export default Student;

import React from "react";
import { uploadLessonFile } from "../../../_actions/data_actions";
import Upload from "./Upload";

function Lesson(props) {
    return <Upload uploadFile={uploadLessonFile} {...props} />;
}

export default Lesson;

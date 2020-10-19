import React from "react";
import { uploadLessonFile } from "../../../_actions/upload_actions";
import Upload from "./Upload";

function Lesson(props) {
    return <Upload uploadFile={uploadLessonFile} title="העלאת נתוני שיעורים" {...props} />;
}

export default Lesson;

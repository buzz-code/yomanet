import React from "react";
import { getLessonData } from "../../../_actions/data_actions";
import TableData from "../../TableData";

function Lesson() {
    return <TableData getData={getLessonData} type="lesson" />;
}

export default Lesson;

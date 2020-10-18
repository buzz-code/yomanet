import React from "react";
import { getLessonData } from "../../../_actions/data_actions";
import TableData from "../../widgets/TableData";

function Lesson() {
    return <TableData getData={getLessonData} type="lesson" title="נתוני שיעורים וקודים" />;
}

export default Lesson;

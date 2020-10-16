import React from "react";
import { getLessonData } from "../../../_actions/data_actions";
import DataPage from "./TableDataPage";

function LessonData() {
    return <DataPage getData={getLessonData} />;
}

export default LessonData;

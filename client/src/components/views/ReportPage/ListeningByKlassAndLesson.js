import React from "react";
import { getListeningByKlassAndLesson } from "../../../_actions/report_actions";
import TableData from "../../TableData";

function ListeningByKlassAndLesson() {
    return (
        <TableData
            type="listeningByKlassAndLesson"
            getData={getListeningByKlassAndLesson}
            title="נתוני האזנה לפי כיתה ומקצוע"
        />
    );
}

export default ListeningByKlassAndLesson;

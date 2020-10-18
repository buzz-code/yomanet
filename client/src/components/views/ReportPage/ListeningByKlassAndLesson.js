import React from "react";
import { getPDFListeningByKlassAndLesson } from "../../../_actions/report_actions";
import TableData from "../../TableData";

function ListeningByKlassAndLesson() {
    return (
        <TableData
            type="listeningByKlassAndLesson"
            getData={getPDFListeningByKlassAndLesson}
            title="נתוני האזנה לפי כיתה ומקצוע"
            isPdf={true}
        />
    );
}

export default ListeningByKlassAndLesson;

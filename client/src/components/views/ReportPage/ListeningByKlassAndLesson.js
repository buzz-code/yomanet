import React from "react";
import { getListeningByKlassAndLesson } from "../../../_actions/report_actions";
import TableData from "../../TableData";

function ListeningByKlassAndLesson() {
    // return 'hh'
    return <TableData type="listeningByKlassAndLesson" getData={getListeningByKlassAndLesson} />;
}

export default ListeningByKlassAndLesson;

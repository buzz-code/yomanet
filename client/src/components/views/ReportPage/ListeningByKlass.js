import React from "react";
import { getPDFListeningByKlass } from "../../../_actions/report_actions";
import TableData from "../../TableData";

function ListeningByKlass() {
    return (
        <TableData
            type="listeningByKlass"
            getData={getPDFListeningByKlass}
            title="נתוני האזנה לפי כיתה"
            isPdf={true}
        />
    );
}

export default ListeningByKlass;

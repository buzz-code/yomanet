import React from "react";
import { getPDFListeningByKlass } from "../../../_actions/report_actions";
import TableData from "../../widgets/TableData";

function ListeningByKlass() {
    return (
        <TableData
            type="listeningByKlass"
            getPdfData={getPDFListeningByKlass}
            title="נתוני האזנה לפי כיתה"
            isPdf={true}
        />
    );
}

export default ListeningByKlass;

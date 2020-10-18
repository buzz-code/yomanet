import React from "react";
import { getPDFConfByKlass } from "../../../_actions/report_actions";
import TableData from "../../widgets/TableData";

function ConfByKlass() {
    return (
        <TableData
            type="confByKlass"
            getData={getPDFConfByKlass}
            title="נתוני ועידה לפי כיתה"
            isPdf={true}
        />
    );
}

export default ConfByKlass;

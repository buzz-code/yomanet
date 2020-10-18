import React from "react";
import { getListeningData } from "../../../_actions/data_actions";
import TableData from "../../widgets/TableData";

function Listening() {
    return <TableData getData={getListeningData} type="listening" title="נתוני האזנה" />;
}

export default Listening;

import React from "react";
import { getConfData } from "../../../_actions/data_actions";
import TableData from "../../widgets/TableData";

function Conf() {
    return <TableData getData={getConfData} type="conf" title="נתוני ועידה" />;
}

export default Conf;

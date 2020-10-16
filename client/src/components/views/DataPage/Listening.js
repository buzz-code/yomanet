import React from "react";
import { getListeningData } from "../../../_actions/data_actions";
import TableData from "./TableData";

function Listening() {
    return <TableData getData={getListeningData} />;
}

export default Listening;

import React from "react";
import { getListeningData } from "../../../_actions/data_actions";
import DataPage from "./TableDataPage";

function ListeningData() {
    return <DataPage getData={getListeningData} />;
}

export default ListeningData;

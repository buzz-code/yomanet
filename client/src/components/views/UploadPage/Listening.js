import React from "react";
import { uploadListeningFile } from "../../../_actions/data_actions";
import Upload from "./Upload";

function Listening(props) {
    return <Upload uploadFile={uploadListeningFile} {...props}/>;
}

export default Listening;

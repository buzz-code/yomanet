import React from "react";
import { uploadListeningFile } from "../../../_actions/upload_actions";
import Upload from "./Upload";

function Listening(props) {
    return <Upload uploadFile={uploadListeningFile} {...props} />;
}

export default Listening;

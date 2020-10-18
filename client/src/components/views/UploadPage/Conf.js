import React from "react";
import { uploadConfFile } from "../../../_actions/upload_actions";
import Upload from "./Upload";

function Conf(props) {
    return <Upload uploadFile={uploadConfFile} {...props} />;
}

export default Conf;

import React from "react";
import { uploadConfFile } from "../../../_actions/upload_actions";
import Upload from "./Upload";

function Conf(props) {
    return <Upload uploadFile={uploadConfFile} title="העלאת נתוני ועידה" {...props} />;
}

export default Conf;

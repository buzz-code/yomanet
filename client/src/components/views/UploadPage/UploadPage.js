import React, { useState } from "react";
import moment from "moment";
import { Formik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";
import { uploadFile } from "../../../_actions/data_actions";

function UploadPage(props) {
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(uploadFile(file)).then((response) => {
            props.history.push("/");
        });
    };

    return (
        <div className="container">
            <div className="main-content">
                <h1>נתוני האזנה</h1>
                <form role="form">
                    <div className="form-group">
                        <label for="fileUpload">העלאת קובץ</label>
                        <input
                            type="file"
                            id="fileUpload"
                            name="fileUpload"
                            className="form-control-file"
                            onChange={handleFileChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                        שליחה
                    </button>
                    &nbsp;
                    <a role="button" href="/" className="btn btn-default">
                        ביטול
                    </a>
                </form>
            </div>
        </div>
    );
}

export default UploadPage;

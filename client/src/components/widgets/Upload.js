import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadFile } from "../../_actions/upload_actions";
import Loader from "./Loader";

function Upload({ url, title, ...props }) {
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setErrorMessage(null);
        setSuccessMessage(null);
    };
    const handleSubmit = (e) => {
        setIsLoading(true);
        e.preventDefault();
        e.stopPropagation();
        dispatch(uploadFile(url, file)).then((response) => {
            console.log(response);
            if (response.payload.error) {
                setErrorMessage(response.payload.errorMessage);
                setSuccessMessage(null);
            } else {
                setSuccessMessage("העלאת הנתונים הסתיימה בהצלחה");
                setErrorMessage(null);
            }
            setIsLoading(false);
        });
    };

    return (
        <div className="container">
            <div className="main-content pt-3">
                <h2>{title}</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="fileUpload">העלאת קובץ</label>
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
                {errorMessage && (
                    <label>
                        <p
                            style={{
                                color: "#ff0000bf",
                                fontSize: "0.7rem",
                                border: "1px solid",
                                padding: "1rem",
                                borderRadius: "10px",
                            }}>
                            {errorMessage}
                        </p>
                    </label>
                )}
                {successMessage && (
                    <div>
                        <p
                            style={{
                                color: "#28a745",
                                fontSize: "0.7rem",
                                border: "1px solid",
                                padding: "1rem",
                                borderRadius: "10px",
                            }}>
                            {successMessage}
                        </p>
                    </div>
                )}
                {isLoading && <Loader />}
            </div>
        </div>
    );
}

export default Upload;

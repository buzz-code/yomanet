import React, { useState } from "react";
import { useDispatch } from "react-redux";

function Upload({ uploadFile, ...props }) {
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
                <form role="form">
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
            </div>
        </div>
    );
}

export default Upload;

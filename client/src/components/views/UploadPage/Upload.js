import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "../../widgets/Loader";

function Upload({ uploadFile, title, ...props }) {
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    const handleSubmit = (e) => {
        setIsLoading(true);
        e.preventDefault();
        e.stopPropagation();
        dispatch(uploadFile(file)).then((response) => {
            setMessage("העלאת הנתונים הסתיימה בהצלחה");
            setIsLoading(false);
            // setTimeout(() => {
            //     props.history.push("/");
            // }, 3000);
        });
    };

    return (
        <div className="container">
            <div className="main-content pt-3">
                <h1>{title}</h1>
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
                {message && (
                    <div>
                        <p
                            style={{
                                color: "#28a745",
                                fontSize: "0.7rem",
                                border: "1px solid",
                                padding: "1rem",
                                borderRadius: "10px",
                            }}>
                            {message}
                        </p>
                    </div>
                )}
                {isLoading && <Loader />}
            </div>
        </div>
    );
}

export default Upload;

import React from "react";

function Report({ fields, handleGetData }) {
    const handleSubmit = () => {
        handleGetData();
    };

    return (
        <div className="container">
            <div className="main-content pt-3">
                <form className="p-2 jumbotron container">
                    {fields}
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                        סנן
                    </button>
                    &nbsp;
                    <button type="clear" className="btn btn-default">
                        נקה סינון
                    </button>
                </form>
            </div>
        </div>
        
    );
}

export default Report;

import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function EmailReportPopup({ isOpen, onClose }) {
    const [recipient, setRecipient] = useState("");
    const [format, setFormat] = useState("");

    const handleClose = (isSend) => {
        onClose(isSend, recipient, format);
    };

    return (
        <Modal show={isOpen} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>שליחת דוח במייל</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="p-2">
                    <div className="form-group row">
                        <label htmlFor="recipient" className="col-sm-2">
                            כתובת מייל לשליחה
                        </label>
                        <div className="col">
                            <input
                                type="text"
                                id="recipient"
                                name="recipient"
                                placeholder="הכנס כתובת מייל"
                                className="form-control"
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="format" className="col-sm-2">
                            פורמט
                        </label>
                        <div className="col">
                            <select
                                id="format"
                                name="format"
                                className="custom-select"
                                value={format}
                                onChange={(e) => setFormat(e.target.value)}>
                                <option disabled value="">
                                    --בחר פורמט--
                                </option>
                                <option value="PDF">Pdf</option>
                                <option value="EXCEL">אקסל</option>
                            </select>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose(false)}>
                    ביטול
                </Button>
                <Button variant="primary" onClick={() => handleClose(true)}>
                    שלח
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

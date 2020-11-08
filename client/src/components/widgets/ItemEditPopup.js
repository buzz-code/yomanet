import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function ItemEditPopup({ isOpen, onClose, item, headers }) {
    const [values, setValues] = useState(null);

    useEffect(() => {
        setValues(item);
    }, [item]);

    const handleClose = (isSend) => {
        onClose(isSend, values);
    };

    return (
        <Modal show={isOpen} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>עריכת רשומה</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="p-2">
                    {values &&
                        headers.map((item) => (
                            <React.Fragment key={item.value}>
                                <div className="form-group row">
                                    <label htmlFor={item.value} className="col-sm-2">
                                        {item.label}
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            id={item.value}
                                            name={item.value}
                                            placeholder={item.label}
                                            className="form-control"
                                            disabled={!item.editable}
                                            value={values[item.value]}
                                            onChange={(e) => setValues({ ...values, [item.value]: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose(false)}>
                    ביטול
                </Button>
                <Button variant="primary" onClick={() => handleClose(true)}>
                    שמור
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

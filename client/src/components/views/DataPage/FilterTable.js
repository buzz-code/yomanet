import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function FilterTable({ type, params, getData }) {
    const dispatch = useDispatch();

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [klass, setKlass] = useState("");
    const [lesson, setLesson] = useState("");
    const [fromSeconds, setFromSeconds] = useState("");
    const [toSeconds, setToSeconds] = useState("");
    const [extension, setExtension] = useState("");
    const [messageName, setMessageName] = useState("");
    const [identityNumber, setIdentityNumber] = useState("");
    const [name, setName] = useState("");
    const [grade, setGrade] = useState("");
    const [classNum, setClassNum] = useState("");

    useEffect(() => {
        setFromDate(params.fromDate);
        setToDate(params.toDate);
        setKlass(params.klass);
        setLesson(params.lesson);
        setFromSeconds(params.fromSeconds);
        setToSeconds(params.toSeconds);
        setExtension(params.extension);
        setMessageName(params.messageName);
        setIdentityNumber(params.identityNumber);
        setName(params.name);
        setGrade(params.grade);
        setClassNum(params.classNum);
    }, [params]);

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const dataToSubmit = {
            fromDate,
            toDate,
            klass,
            lesson,
            fromSeconds,
            toSeconds,
            extension,
            messageName,
            identityNumber,
            name,
            grade,
            classNum,
        };
        dispatch(getData(dataToSubmit));
    };

    let fields = null;
    switch (type) {
        case "listening":
            fields = (
                <>
                    <div className="form-group">
                        <label className="m-1">טווח תאריכים</label>
                        <input
                            type="date"
                            id="user"
                            name="fromDate"
                            className="form-control"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                        />
                        <label className="m-1">עד</label>
                        <input
                            type="date"
                            id="user"
                            name="toDate"
                            className="form-control"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="klass">כיתה</label>
                        <input
                            type="text"
                            id="klass"
                            name="klass"
                            placeholder="הכנס כיתה"
                            className="form-control"
                            value={klass}
                            onChange={(e) => setKlass(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lesson">שיעור</label>
                        <input
                            type="text"
                            id="lesson"
                            name="lesson"
                            placeholder="הכנס שיעור"
                            className="form-control"
                            value={lesson}
                            onChange={(e) => setLesson(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="m-1">טווח שניות</label>
                        <input
                            type="number"
                            id="fromSeconds"
                            name="fromSeconds"
                            placeholder="החל מ..."
                            className="form-control"
                            value={fromSeconds}
                            onChange={(e) => setFromSeconds(e.target.value)}
                        />
                        <label className="m-1">עד</label>
                        <input
                            type="number"
                            id="toSeconds"
                            name="toSeconds"
                            placeholder="עד"
                            className="form-control"
                            value={toSeconds}
                            onChange={(e) => setToSeconds(e.target.value)}
                        />
                    </div>
                </>
            );
            break;
        case "lesson":
            fields = (
                <>
                    <div className="form-group">
                        <label htmlFor="extension">שלוחה</label>
                        <input
                            type="text"
                            id="extension"
                            name="extension"
                            placeholder="הכנס שלוחה"
                            className="form-control"
                            value={extension}
                            onChange={(e) => setExtension(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="messageName">שם הודעה</label>
                        <input
                            type="text"
                            id="messageName"
                            name="messageName"
                            placeholder="הכנס שם הודעה"
                            className="form-control"
                            value={messageName}
                            onChange={(e) => setMessageName(e.target.value)}
                        />
                    </div>
                </>
            );
            break;
        case "student":
            fields = (
                <>
                    <div className="form-group">
                        <label htmlFor="identityNumber">מספר זהות</label>
                        <input
                            type="text"
                            id="identityNumber"
                            name="identityNumber"
                            placeholder="הכנס מספר זהות"
                            className="form-control"
                            value={identityNumber}
                            onChange={(e) => setIdentityNumber(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">שם</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="הכנס שם"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="grade">שכבה</label>
                        <input
                            type="text"
                            id="grade"
                            name="grade"
                            placeholder="הכנס שכבה"
                            className="form-control"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="classNum">מספר כיתה</label>
                        <input
                            type="text"
                            id="classNum"
                            name="classNum"
                            placeholder="הכנס מספר כיתה"
                            className="form-control"
                            value={classNum}
                            onChange={(e) => setClassNum(e.target.value)}
                        />
                    </div>
                </>
            );
            break;
    }

    return (
        <form className="form-inline p-2 jumbotron">
            {fields}
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                סנן
            </button>
            &nbsp;
            <button type="clear" className="btn btn-default">
                נקה סינון
            </button>
        </form>
    );
}

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function FilterTable({ params, getData }) {
    const dispatch = useDispatch();

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [klass, setKlass] = useState("");
    const [lesson, setLesson] = useState("");
    const [fromSeconds, setFromSeconds] = useState("");
    const [toSeconds, setToSeconds] = useState("");

    useEffect(() => {
        setFromDate(params.fromDate);
        setToDate(params.toDate);
        setKlass(params.klass);
        setLesson(params.lesson);
        setFromSeconds(params.fromSeconds);
        setToSeconds(params.toSeconds);
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
        };
        dispatch(getData(dataToSubmit));
    };
    return (
        <form role="form" className="form-inline p-2 jumbotron">
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

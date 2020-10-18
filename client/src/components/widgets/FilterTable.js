import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getLessonList, getKlassList } from "../../_actions/list_actions";
import TypeAhead from "./TypeAhead";

export default function FilterTable({ type, params, getData, isPdf }) {
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

    const getDataToSubmit = () => {
        return {
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
    };

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
        const dataToSubmit = getDataToSubmit();
        dispatch(getData(dataToSubmit));
    };

    const dates = (
        <>
            <div className="form-group row">
                <label className="m-1 col-sm-2">תאריכים</label>
                <div className="col">
                    <input
                        type="date"
                        id="user"
                        name="fromDate"
                        className="form-control"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                </div>
                <label className="m-1 col-sm-1">עד</label>
                <div className="col">
                    <input
                        type="date"
                        id="user"
                        name="toDate"
                        className="form-control"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                    />
                </div>
            </div>
        </>
    );

    let fields = null;
    switch (type) {
        case "listening":
            fields = (
                <>
                    <div className="form-group row">
                        <label htmlFor="klass" className="col-sm-2">
                            כיתה
                        </label>
                        <div className="col">
                            <TypeAhead
                                id="klass"
                                multiple={true}
                                placeholder={"בחר כיתה..."}
                                value={klass}
                                setValue={setKlass}
                                getOptions={getKlassList}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="lesson" className="col-sm-2">
                            שיעור
                        </label>
                        <div className="col">
                            <TypeAhead
                                id="lesson"
                                multiple={true}
                                placeholder={"בחר שיעור..."}
                                value={lesson}
                                setValue={setLesson}
                                getOptions={(query) => getLessonList(query)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="m-1 col-sm-2">טווח שניות</label>
                        <div className="col">
                            <input
                                type="number"
                                id="fromSeconds"
                                name="fromSeconds"
                                placeholder="החל מ..."
                                className="form-control col"
                                value={fromSeconds}
                                onChange={(e) => setFromSeconds(e.target.value)}
                            />
                        </div>
                        <label className="m-1 col-sm-2">עד</label>
                        <div className="col">
                            <input
                                type="number"
                                id="toSeconds"
                                name="toSeconds"
                                placeholder="עד"
                                className="form-control col"
                                value={toSeconds}
                                onChange={(e) => setToSeconds(e.target.value)}
                            />
                        </div>
                    </div>
                    {dates}
                </>
            );
            break;
        case "lesson":
            fields = (
                <>
                    <div className="form-group row">
                        <label htmlFor="extension" className="col-sm-2">
                            שלוחה
                        </label>
                        <div className="col">
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
                    </div>
                    <div className="form-group row">
                        <label htmlFor="messageName" className="col-sm-2">
                            שם הודעה
                        </label>
                        <div className="col">
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
                    </div>
                </>
            );
            break;
        case "student":
            fields = (
                <>
                    <div className="form-group row">
                        <label htmlFor="identityNumber" className="col-sm-2">
                            מספר זהות
                        </label>
                        <div className="col">
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
                    </div>
                    <div className="form-group row">
                        <label htmlFor="name" className="col-sm-2">
                            שם
                        </label>
                        <div className="col">
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
                    </div>
                    <div className="form-group row">
                        <label htmlFor="klass" className="col-sm-2">
                            כיתה
                        </label>
                        <div className="col">
                            <TypeAhead
                                id="klass"
                                multiple={true}
                                placeholder={"בחר כיתה..."}
                                value={klass}
                                setValue={setKlass}
                                getOptions={getKlassList}
                            />
                        </div>
                    </div>
                </>
            );
            break;
        case "listeningByKlassAndLesson":
            fields = (
                <>
                    <div className="form-group row">
                        <label htmlFor="klass" className="col-sm-2">
                            כיתה
                        </label>
                        <div className="col">
                            <TypeAhead
                                multiple={false}
                                id="klass"
                                placeholder={"בחר כיתה..."}
                                value={klass}
                                setValue={setKlass}
                                getOptions={getKlassList}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="lesson" className="col-sm-2">
                            שיעור
                        </label>
                        <div className="col">
                            <TypeAhead
                                id="lesson"
                                multiple={false}
                                placeholder={"בחר שיעור..."}
                                value={lesson}
                                setValue={setLesson}
                                getOptions={(query) => getLessonList(query)}
                            />
                        </div>
                    </div>
                    {dates}
                </>
            );
            break;
        case "listeningByKlass":
            fields = (
                <>
                    <div className="form-group row">
                        <label htmlFor="klass" className="col-sm-2">
                            כיתה
                        </label>
                        <div className="col">
                            <TypeAhead
                                multiple={false}
                                id="klass"
                                placeholder={"בחר כיתה..."}
                                value={klass}
                                setValue={setKlass}
                                getOptions={getKlassList}
                            />
                        </div>
                    </div>
                    {dates}
                </>
            );
            break;
        default:
            break;
    }

    return (
        <>
            <form className="p-2 jumbotron container">{fields}</form>
            <div className="container d-flex mb-4">
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                    {isPdf ? "יצר דוח" : "סנן נתונים"}
                </button>
                &nbsp;
                <button type="clear" className="btn btn-default mr-auto">
                    נקה סינון
                </button>
            </div>
        </>
    );
}

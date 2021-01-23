import React, { useEffect, useState } from "react";
import { reportTypeMapping } from "../../config/constants";
import { getLessonList, getKlassList, getMegamaList, getStudentList } from "../../_actions/list_actions";
import EmailReportPopup from "./EmailReportPopup";
import TypeAhead from "./TypeAhead";

export default function FilterTable({
    params,
    filterFields,
    getData,
    reportData,
    sendEmailData,
    isHideEmailButton,
    isHidePdfButton,
    isHideExcelButton,
    reportTypes = [],
}) {
    const [isEmailReportOpen, setIsEmailReportOpen] = useState(false);

    const [reportType, setReportType] = useState(reportTypes[0]);

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [klass, setKlass] = useState([]);
    const [megama, setMegama] = useState([]);
    const [student, setStudent] = useState([]);
    const [lesson, setLesson] = useState([]);
    const [allLessons, setAllLessons] = useState(false);
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
            megama,
            student,
            lesson,
            allLessons,
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
        setFromDate(params.fromDate || "");
        setToDate(params.toDate || "");
        setKlass(params.klass || []);
        setMegama(params.megama || []);
        setStudent(params.student || []);
        setLesson(params.lesson || []);
        setAllLessons(params.allLessons || false);
        setFromSeconds(params.fromSeconds || "");
        setToSeconds(params.toSeconds || "");
        setExtension(params.extension || "");
        setMessageName(params.messageName || "");
        setIdentityNumber(params.identityNumber || "");
        setName(params.name || "");
        setGrade(params.grade || "");
        setClassNum(params.classNum || "");
    }, [params]);

    const handleSubmit = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        const dataToSubmit = getDataToSubmit();
        getData(reportType, dataToSubmit);
    };

    const handleClear = (e) => {
        e.preventDefault();
        e.stopPropagation();

        getData(reportType);
    };

    const handleEmailReportClose = (isSend, recipient, format) => {
        if (isSend) {
            sendEmailData(reportType, recipient, { ...params, format });
        }
        setIsEmailReportOpen(false);
    };

    const handlePdfReport = (e) => {
        e.preventDefault();
        e.stopPropagation();

        reportData(reportType, { ...params, format: "PDF" });
    };

    const handleExcelReport = (e) => {
        e.preventDefault();
        e.stopPropagation();

        reportData(reportType, { ...params, format: "EXCEL" });
    };

    useEffect(() => {
        handleSubmit();
    }, [reportType]);

    // const handleDelete = () => {
    //     window.confirm("האם אתה בטוח שאתה רוצה למחוק?") && dispatch(deleteData(url, params));
    // };

    const fields = {
        reportType: (
            <div className="form-group row">
                <label htmlFor="reportType" className="col-sm-2">
                    סוג נתונים
                </label>
                <div className="col">
                    <select
                        id="reportType"
                        name="reportType"
                        placeholder="בחר סוג נתונים"
                        className="form-control"
                        value={reportType}
                        onChange={(e) => setReportType(e.target.value)}>
                        {reportTypes.map((item) => (
                            <option value={item}>{reportTypeMapping[item]}</option>
                        ))}
                    </select>
                </div>
            </div>
        ),
        dateRange: (
            <div className="form-group row">
                <label className="m-1 col-sm-2">תאריכים</label>
                <div className="col">
                    <input
                        type="date"
                        id="fromDate"
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
                        id="toDate"
                        name="toDate"
                        className="form-control"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                    />
                </div>
            </div>
        ),
        klass: (
            <div className="form-group row">
                <label htmlFor="klass" className="col-sm-2">
                    כיתות
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
        ),
        megama: (
            <div className="form-group row">
                <label htmlFor="megama" className="col-sm-2">
                    מגמות
                </label>
                <div className="col">
                    <TypeAhead
                        multiple={true}
                        id="megama"
                        placeholder={"בחר מגמה..."}
                        value={megama}
                        setValue={setMegama}
                        getOptions={getMegamaList}
                    />
                </div>
            </div>
        ),
        student: (
            <div className="form-group row">
                <label htmlFor="student" className="col-sm-2">
                    תלמידות
                </label>
                <div className="col">
                    <TypeAhead
                        id="student"
                        multiple={true}
                        placeholder={"בחר תלמידה..."}
                        value={student}
                        setValue={setStudent}
                        getOptions={(query) => getStudentList(query)}
                    />
                </div>
            </div>
        ),
        lesson: (
            <div className="form-group row">
                <label htmlFor="lesson" className="col-sm-2">
                    שיעורים
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
        ),
        lessonWithAll: (
            <div className="form-group row">
                <label htmlFor="lesson" className="col-sm-2">
                    שיעורים
                </label>
                <div className="col">
                    <TypeAhead
                        id="lesson"
                        multiple={true}
                        disabled={allLessons}
                        placeholder={"בחר שיעור..."}
                        value={lesson}
                        setValue={setLesson}
                        getOptions={(query) => getLessonList(query)}
                    />
                </div>
                <div className="col-sm-3 d-flex align-items-center">
                    <input
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        className="form-check-inline"
                        value={allLessons}
                        onChange={(e) => setAllLessons(e.target.checked)}
                    />
                    <label htmlFor="rememberMe" className="d-inline m-0">
                        בחר את כל השיעורים המתאימים
                    </label>
                </div>
            </div>
        ),
        name: (
            <div className="form-group row">
                <label htmlFor="name" className="col-sm-2">
                    שם תלמידה
                </label>
                <div className="col">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="הכנס שם תלמידה"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
            </div>
        ),
        secondRange: (
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
                <label className="m-1 col-sm-1">עד</label>
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
        ),
        extension: (
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
        ),
        messageName: (
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
        ),
        identityNumber: (
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
        ),
        singleKlass: (
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
        ),
        singleMegama: (
            <div className="form-group row">
                <label htmlFor="megama" className="col-sm-2">
                    מגמה
                </label>
                <div className="col">
                    <TypeAhead
                        multiple={false}
                        id="megama"
                        placeholder={"בחר מגמה..."}
                        value={megama}
                        setValue={setMegama}
                        getOptions={getMegamaList}
                    />
                </div>
            </div>
        ),
        singleStudent: (
            <div className="form-group row">
                <label htmlFor="student" className="col-sm-2">
                    תלמידה
                </label>
                <div className="col">
                    <TypeAhead
                        id="student"
                        multiple={false}
                        placeholder={"בחר תלמידה..."}
                        value={student}
                        setValue={setStudent}
                        getOptions={(query) => getStudentList(query)}
                    />
                </div>
            </div>
        ),
        singleLesson: (
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
        ),
    };

    return (
        <>
            {reportTypes && reportTypes.length > 0 && fields.reportType}
            {filterFields.length > 0 && (
                <form className="p-2 jumbotron container">{filterFields.map((item) => fields[item])}</form>
            )}
            <div className="d-flex mb-4">
                {filterFields.length > 0 ? (
                    <>
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                            סנן נתונים
                        </button>
                        &nbsp;
                        <button type="clear" className="btn btn-default mr-auto" onClick={handleClear}>
                            נקה סינון
                        </button>
                    </>
                ) : (
                    <button type="submit" className="btn btn-primary mr-auto" onClick={handleSubmit}>
                        רענן נתונים
                    </button>
                )}
                <EmailReportPopup isOpen={isEmailReportOpen} onClose={handleEmailReportClose} />
                {!isHideEmailButton && (
                    <button
                        className="btn btn-outline-dark"
                        onClick={() => setIsEmailReportOpen(true)}
                        title="שלח את הנתונים במייל">
                        Email <i className="fa fa-envelope"></i>
                    </button>
                )}
                {!isHidePdfButton && (
                    <button className="btn btn-outline-dark ml-2" onClick={handlePdfReport} title="יצא את הנתונים לPDF">
                        Pdf <i className="fa fa-file-pdf"></i>
                    </button>
                )}
                {!isHideExcelButton && (
                    <button
                        className="btn btn-outline-dark ml-2"
                        onClick={handleExcelReport}
                        title="יצא את הנתונים לאקסל">
                        Excel <i className="fa fa-file-excel"></i>
                    </button>
                )}
                {/* {params && (
                    <button
                        className="btn btn-outline-dark"
                        onClick={handleDelete}
                        title="מחק את כל הנתונים שתואמים את החיפוש">
                        <i className="fa fa-trash"></i>
                    </button>
                )} */}
            </div>
        </>
    );
}

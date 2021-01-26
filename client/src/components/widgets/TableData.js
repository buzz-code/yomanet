import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData, reportData, sendReportByEmail, saveItem } from "../../_actions/data_actions";
import FilterTable from "./FilterTable";
import ItemEditPopup from "./ItemEditPopup";
import Loader from "./Loader";
import PagingTable from "./PagingTable";
import { reportTypeMapping } from "../../config/constants";

function TableData({ url, title, filterFields, filterProps, isEditable, reportTypes }) {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.data.data);
    const params = data && data.params ? data.params : {};

    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editData, setEditData] = useState(null);
    const [reportType, setReportType] = useState(reportTypes && reportTypes[0]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        handleGetData(params);
    }, [dispatch, url, reportType, page]);

    useEffect(() => {
        if (data) {
            setIsLoading(false);
        }
    }, [data]);

    const handleGetData = (params) => {
        setIsLoading(true);
        dispatch(getData(url, reportType, { ...params, page }));
    };
    const handleReportData = (params) => {
        dispatch(reportData(url, reportType, params));
    };
    const handleSendEmailData = (recipient, params) => {
        setIsLoading(true);
        dispatch(sendReportByEmail(recipient, url, reportType, params))
            .then((res) => res.payload)
            .then((res) => {
                setIsLoading(false);
                if (!res.error) {
                    window.alert("הדוח נשלח בהצלחה");
                } else {
                    window.alert("ארעה שגיאה");
                }
            });
    };
    const handleEdit = (item) => {
        setEditData(item);
        setIsEdit(true);
    };
    const handleEditClose = (isSave, item) => {
        setIsEdit(false);
        if (isSave) {
            dispatch(saveItem(url, item))
                .then((res) => res.payload)
                .then((res) => {
                    setIsLoading(false);
                    if (!res.error) {
                        window.alert(res.successMessage);
                    } else {
                        window.alert(res.errorMessage);
                    }
                });
        }
    };

    return (
        <div className="container">
            <div className="main-content pt-3">
                <h2>{title}</h2>
                <div>
                    {reportTypes && reportTypes.length > 0 && (
                        <div className="form-group row">
                            <label htmlFor="reportType" className="col-sm-2">סוג נתונים</label>
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
                    )}
                    <FilterTable
                        url={url}
                        params={params}
                        filterFields={filterFields}
                        getData={handleGetData}
                        reportData={handleReportData}
                        sendEmailData={handleSendEmailData}
                        {...filterProps}
                    />
                    {isLoading && <Loader />}
                    {data && data.headers && (
                        <>
                            <table className="table table-striped table-hover table-sm">
                                <thead>
                                    <tr>
                                        {data.headers
                                            .filter((item) => !item.hidden)
                                            .map((item) => (
                                                <th key={item.value}>{item.label}</th>
                                            ))}
                                        {isEditable && <th>עריכה</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.results.map((item) => (
                                        <tr>
                                            {data.headers
                                                .filter((item) => !item.hidden)
                                                .map((header) => (
                                                    <td>{item[header.value]}</td>
                                                ))}
                                            {isEditable && (
                                                <td>
                                                    <button className="btn">
                                                        <i
                                                            className="fa fa-pencil"
                                                            title="ערוך"
                                                            onClick={() => handleEdit(item)}></i>
                                                    </button>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <PagingTable pageCount={data.pageCount} page={page} onChange={setPage} />
                            <ItemEditPopup
                                isOpen={isEdit}
                                onClose={handleEditClose}
                                item={editData}
                                headers={data.headers}
                            />
                        </>
                    )}
                    {data && (data.errorMessage || data.results.length === 0) && (
                        <h4 className="text-center">{data.errorMessage || "לא נמצאו נתונים"}</h4>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TableData;

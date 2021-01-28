import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilesData, loadFile } from "../../_actions/data_actions";
import Loader from "./Loader";
import Breadcrumb from "react-bootstrap/Breadcrumb";

function FilesData({ url, title }) {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.data.data);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        dispatch(getFilesData(url));
    }, [dispatch, url]);

    useEffect(() => {
        if (data) {
            setIsLoading(false);
        }
    }, [data]);

    const goToRoot = () => {
        setIsLoading(true);
        dispatch(getFilesData(url));
    };

    const updateFileData = () => {
        dispatch(getFilesData(url, data.params));
    };

    const handleItem = (item) => {
        setIsLoading(true);

        if (!item.isFile) {
            dispatch(getFilesData(url, { subPath: item.name }));
        } else {
            dispatch(loadFile(url, item.fullPath))
                .then((res) => res.payload)
                .then((res) => {
                    if (res.error) {
                        setIsLoading(false);
                        alert(res.errorMessage);
                    } else {
                        updateFileData();
                        setTimeout(() => updateFileData(), 5000);
                    }
                });
        }
    };

    return (
        <div className="container">
            <div className="main-content pt-3 pb-3">
                <h2>{title}</h2>
                <div>
                    {isLoading && <Loader />}
                    {data && data.params && (
                        <Breadcrumb>
                            <Breadcrumb.Item onClick={goToRoot} active={!data.params.subPath}>
                                תיקית הבסיס
                            </Breadcrumb.Item>
                            {data.params.subPath && <Breadcrumb.Item active>{data.params.subPath}</Breadcrumb.Item>}
                        </Breadcrumb>
                    )}
                    {data && data.results && data.results.length > 0 && (
                        <div className="pb-2">
                            יש ללחוץ לחיצה כפולה על תיקיה כדי להכנס אליה, לחיצה כפולה על קובץ כדי לטעון אותו
                        </div>
                    )}
                    {data && data.headers && (
                        <>
                            <table className="table table-striped table-hover table-sm">
                                <thead>
                                    <tr>
                                        <th> </th>
                                        <th>שם</th>
                                        <th>גודל</th>
                                        <th>תאריך שינוי</th>
                                        <th>סטטוס</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.results.map((item) => (
                                        <tr style={{ cursor: "pointer" }} onDoubleClick={() => handleItem(item)}>
                                            <td>
                                                {item.isFile ? (
                                                    <i className="fa fa-file-chart-line"></i>
                                                ) : (
                                                    <i className="fa fa-folder"></i>
                                                )}
                                            </td>
                                            <td>{item.name}</td>
                                            <td style={{ direction: "ltr" }}>{item.size}</td>
                                            <td>{item.mtime}</td>
                                            <td>{item.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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

export default FilesData;

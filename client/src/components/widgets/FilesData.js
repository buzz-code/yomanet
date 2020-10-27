import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilesData, loadFile } from "../../_actions/data_actions";
import Loader from "./Loader";

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

    const handleLoadFile = (fullPath) => {
        setIsLoading(true);

        dispatch(loadFile(url, fullPath))
            .then((res) => res.payload)
            .then(() => {
                dispatch(getFilesData(url));
            });
    };

    return (
        <div className="container">
            <div className="main-content pt-3 pb-3">
                <h2>{title}</h2>
                <div>
                    {isLoading && <Loader />}
                    {data && data.headers && (
                        <>
                            <table className="table table-striped table-hover table-sm">
                                <thead>
                                    <tr>
                                        {data.headers.map((item) => (
                                            <th key={item.value}>{item.label}</th>
                                        ))}
                                        <th>טען</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.results.map((item) => (
                                        <tr>
                                            {data.headers.map((header) => (
                                                <td>{item[header.value]}</td>
                                            ))}
                                            <td>
                                                <button
                                                    className="btn btn-outline-primary btn-sm"
                                                    onClick={() => handleLoadFile(item.fullPath)}>
                                                    טען קובץ
                                                </button>
                                            </td>
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

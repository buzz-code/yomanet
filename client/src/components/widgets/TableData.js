import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../_actions/data_actions";
import FilterTable from "./FilterTable";
import Loader from "./Loader";
import PagingTable from "./PagingTable";

function TableData({ url, title, filterFields }) {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.data.data);
    const params = data && data.params ? data.params : {};

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const defaultParams = {
            // fromDate: new Date().toISOString().substr(0, 10),
            // toDate: new Date().toISOString().substr(0, 10),
        };
        dispatch(getData(url, defaultParams));
    }, [dispatch, url]);

    useEffect(() => {
        if (data) {
            setIsLoading(false);
        }
    }, [data]);

    return (
        <div className="container">
            <div className="main-content pt-3">
                <h2>{title}</h2>
                <div>
                    <FilterTable url={url} params={params} filterFields={filterFields} />
                    {isLoading && <Loader />}
                    {data && data.headers && (
                        <>
                            <table className="table table-striped table-hover table-sm">
                                <thead>
                                    <tr>
                                        {data.headers.map((item) => (
                                            <th key={item.value}>{item.label}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.results.map((item) => (
                                        <tr>
                                            {data.headers.map((header) => (
                                                <td>{item[header.value]}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {data.results.length === 0 && <h4 className="text-center">לא נמצאו נתונים</h4>}
                            <PagingTable url={url} params={params} pageCount={data.pageCount} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TableData;

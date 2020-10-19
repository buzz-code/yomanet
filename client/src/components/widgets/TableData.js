import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterTable from "./FilterTable";
import Loader from "./Loader";
import PagingTable from "./PagingTable";

function TableData({ getData, type, title, isPdf }) {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.data.data);
    const params = data && data.params ? data.params : {};

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isPdf) {
            setIsLoading(true);
            dispatch(getData());
        }
    }, [dispatch, getData, isPdf]);

    useEffect(() => {
        if (data) {
            setIsLoading(false);
        }
    }, [data]);

    return (
        <div className="container">
            <div className="main-content pt-3">
                <h1>{title}</h1>
                <div>
                    <FilterTable type={type} params={params} getData={getData} isPdf={isPdf} />
                    {isLoading && <Loader />}
                    {data && data.headers && (
                        <>
                            <table className="table table-striped table-hover table-sm table-responsive">
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
                            {!isPdf && <PagingTable params={params} pageCount={data.pageCount} getData={getData} />}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TableData;

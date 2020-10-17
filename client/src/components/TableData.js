import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterTable from "./FilterTable";
import PagingTable from "./PagingTable";

function TableData({ getData, type, title }) {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.data.data);
    const params = data ? data.params : {};

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        dispatch(getData());
    }, [dispatch, getData]);

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
                    <FilterTable type={type} params={params} getData={getData} />
                    {isLoading && "טוען..."}
                    {data && (
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
                            <PagingTable params={params} pageCount={data.pageCount} getData={getData} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TableData;

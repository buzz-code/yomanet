import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterTable from "./FilterTable";
import PagingTable from "./PagingTable";

function DataPage({ getData, type }) {
    const dispatch = useDispatch();
    let data = useSelector((state) => state.data.data);

    useEffect(() => {
        dispatch(getData());
    }, []);

    return (
        <div className="container">
            <div className="main-content">
                {data && (
                    <>
                        <h1>{data.title}</h1>
                        <div>
                            <FilterTable type={type} params={data.params} getData={getData} />
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
                            <PagingTable params={data.params} totalCount={data.totalCount} getData={getData} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default DataPage;

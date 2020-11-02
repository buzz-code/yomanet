import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "react-chartjs-2";
import { getGraphData } from "../../_actions/graph_actions";
import FilterGraph from "./FilterGraph";
import Loader from "./Loader";

function GraphWithFilter({ url, title, filterFields }) {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.graph.data);
    const params = data && data.params ? data.params : {};

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (filterFields.length === 0) {
            handleGetData();
        }
    }, [dispatch, url]);

    useEffect(() => {
        if (data) {
            setIsLoading(false);
        }
    }, [data]);

    const handleGetData = (params) => {
        if (filterFields.length > 0) {
            setIsLoading(true);
        }
        dispatch(getGraphData(url, params));
    };

    return (
        <div className="container">
            <div className="main-content pt-3">
                <h2>{title}</h2>
                <div>
                    {filterFields.length > 0 && (
                        <FilterGraph getData={handleGetData} params={params} filterFields={filterFields} />
                    )}
                    {isLoading && <Loader />}
                    {!isLoading && !data && filterFields.length > 0 && (
                        <h5 className="text-center">כדי לראות תוצאות יש לבצע סינון</h5>
                    )}
                    <div className="row">
                        {data &&
                            data.charts &&
                            data.charts.map((item) => (
                                <div className="col-lg-6">
                                    <div className="card mb-4">
                                        <div className="card-header">{item.title}</div>
                                        <div className="card-body">
                                            <Chart {...item} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GraphWithFilter;

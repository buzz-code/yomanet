import React, { useEffect } from "react";
import Chart from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData } from "../../../_actions/dashboard_actions";
import Loader from "../../widgets/Loader";

function LandingPage() {
    const dispatch = useDispatch();
    const charts = useSelector((state) => state.dashboard.charts);
    const user = useSelector((state) => state.user.userData);

    useEffect(() => {
        dispatch(getDashboardData());
    }, [dispatch]);

    return (
        <div className="app">
            <div className="container">
                <h2 className="text-center pt-3">
                    {(user && user.userData && user.userData.welcomeMessage) ||
                        "ברוכים הבאים ליומנט - היומן של בית הספר במרחב הקולי"}
                </h2>
                <div className="row">
                    {charts &&
                        charts.map((item) => (
                            <div className="col-lg-6">
                                <Chart {...item} />
                            </div>
                        ))}
                    {!charts && <Loader />}
                </div>
            </div>
        </div>
    );
}

export default LandingPage;

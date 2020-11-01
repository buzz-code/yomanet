import React from "react";
import { useSelector } from "react-redux";
import GraphWithFilter from "../../widgets/GraphWithFilter";

function LandingPage() {
    const user = useSelector((state) => state.user);

    return (
        <div className="app">
            <div className="container">
                <h2 className="pt-3">
                    {(user && user.userData && user.userData.welcomeMessage) || (
                        <>
                            <div>ברוכים הבאים ליומנט - היומן של בית הספר במרחב הקולי</div>
                        </>
                    )}
                </h2>
                <div className="alert alert-info text-center">
                    <strong>שימו לב!</strong>
                    <span> עברנו לכתובת חדשה </span>
                    <a href="http://www.yomanet.com">http://www.yomanet.com</a>
                </div>
                <GraphWithFilter url="" title="" filterFields={[]} />
            </div>
        </div>
    );
}

export default LandingPage;

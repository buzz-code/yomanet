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
                <GraphWithFilter url="" title="" filterFields={[]} />
            </div>
        </div>
    );
}

export default LandingPage;

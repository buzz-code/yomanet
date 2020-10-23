import React from "react";
import { useSelector } from "react-redux";
import GraphWithFilter from "../../widgets/GraphWithFilter";

function LandingPage() {
    const user = useSelector((state) => state.user);

    return (
        <div className="app">
            <div className="container">
                <h2 className="text-center pt-3">
                    {(user && user.userData && user.userData.welcomeMessage) || (
                        <>
                            <div>ברוכים הבאים ליומנט - היומן של בית הספר במרחב הקולי</div>
                            <h5>פרטי משתמש לדוגמא- שם משתמש: a0527609942@gmail.com סיסמא: 123456</h5>
                        </>
                    )}
                </h2>
                <div class="alert alert-info text-center">
                    <strong>שימו לב!</strong>
                    <span> עברנו לכתובת חדשה </span>
                    <a href="https://yomanet.herokuapp.com">https://yomanet.herokuapp.com</a>
                </div>
                <GraphWithFilter url="" title="" filterFields={[]} />
            </div>
        </div>
    );
}

export default LandingPage;

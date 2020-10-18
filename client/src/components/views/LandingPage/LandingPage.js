import React from "react";
import { FaSmile } from "react-icons/fa";
import { useSelector } from "react-redux";

function LandingPage() {
    const user = useSelector((state) => state.user);
    return (
        <>
            <div className="app">
                <FaSmile style={{ fontSize: "4rem" }} />
                <br />
                <span style={{ fontSize: "2rem" }}>
                    {(user && user.userData && user.userData.welcomeMessage) || "ברוכים הבאים!"}
                </span>
            </div>
        </>
    );
}

export default LandingPage;

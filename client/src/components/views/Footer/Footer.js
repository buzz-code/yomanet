import React from "react";

function Footer() {
    return (
        <footer
            className="footer"
            style={{
                position: "absolute",
                bottom: "0",
                width: "100%",
                height: "60px",
                lineHeight: "60px",
                backgroundColor: "#f5f5f5",
            }}>
            <div className="container">
                <span className="text-muted">לפרטים נוספים 050-4105475.</span>
            </div>
        </footer>
    );
}

export default Footer;

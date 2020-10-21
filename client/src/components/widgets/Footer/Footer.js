import React from "react";

function Footer() {
    return (
        <footer
            className="footer"
            style={{
                position: "fixed",
                zIndex: "9999",
                top: "calc(100vh - 56px)",
                width: "100%",
                height: "60px",
                lineHeight: "60px",
                backgroundColor: "#f5f5f5",
            }}>
            <div className="container">
                <span className="text-muted">למידע ופרטים נוספים 050-4105475 או hadasa.schechter@gmail.com</span>
            </div>
        </footer>
    );
}

export default Footer;

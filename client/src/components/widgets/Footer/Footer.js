import React from "react";

function Footer() {
    return (
        <footer
            className="footer fixed-bottom"
            style={{
                height: "60px",
                lineHeight: "60px",
                backgroundColor: "#f5f5f5",
            }}>
            <div className="container d-flex">
                <span className="text-muted">למידע ופרטים נוספים 050-4105475 או hadasa.schechter@gmail.com</span>
                <div className="flex-fill"></div>
                {/* <span className="ml-auto small">האתר בהרצה, נשמח אם תעדכנו אותנו על כל תקלה</span> */}
            </div>
        </footer>
    );
}

export default Footer;

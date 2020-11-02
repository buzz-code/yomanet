import React from "react";
import { default as CustomLoader } from "react-loader-spinner";

export default function Loader({ isFullScreen = true }) {
    return (
        <div
            style={{
                width: "100%",
                height: isFullScreen ? "100%" : null,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: isFullScreen ? "fixed" : null,
                top: "0",
                right: "0",
                backgroundColor: isFullScreen ? "#33333333" : null,
                zIndex: "999999",
            }}>
            <CustomLoader type="ThreeDots" color="#563d7c" height="100" width="100" />
        </div>
    );
}

import React from "react";
import { default as CustomLoader } from "react-loader-spinner";

export default function Loader() {
    return (
        <div
            style={{
                width: "100%",
                height: "100",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <CustomLoader type="ThreeDots" color="#563d7c" height="100" width="100" />
        </div>
    );
}

import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../../../hoc/auth";
import uploadConfig from "../../../config/uploadConfig";
import Upload from "../../widgets/Upload";

function UploadPage(props) {
    return (
        <>
            <Switch>
                {uploadConfig
                    .map((item) => {
                        return (
                            <Route
                                exact
                                path={`/upload/${item.url}`}
                                component={Auth(Upload, true, false, { ...item })}
                            />
                        );
                    })}
            </Switch>
        </>
    );
}

export default UploadPage;

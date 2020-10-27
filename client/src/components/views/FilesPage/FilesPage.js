import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../../../hoc/auth";
import yemotFilesConfig from "../../../config/yemotFilesConfig";
import FilesData from "../../widgets/FilesData";

function FilesPage(props) {
    return (
        <>
            <Switch>
                {yemotFilesConfig
                    .map((item) => {
                        return (
                            <Route
                                exact
                                path={`/files/${item.url}`}
                                component={Auth(FilesData, true, item.isAdmin, { ...item })}
                            />
                        );
                    })}
            </Switch>
        </>
    );
}

export default FilesPage;

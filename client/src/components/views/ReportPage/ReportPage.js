import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../../../hoc/auth";
import dataConfig from "../../../config/dataConfig";
import TableData from "../../widgets/TableData";

function ReportPage(props) {
    return (
        <>
            <Switch>
                {dataConfig
                    .filter((item) => item.isReport)
                    .map((item) => {
                        return (
                            <Route
                                exact
                                path={`/report/${item.url}`}
                                component={Auth(TableData, true, item.isAdmin, { ...item })}
                            />
                        );
                    })}
            </Switch>
        </>
    );
}

export default ReportPage;

import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../../../hoc/auth";
import dataConfig from "../../../config/dataConfig";
import TableData from "../../widgets/TableData";

function DataPage(props) {
    return (
        <>
            <Switch>
                {dataConfig.map((item) => {
                    return (
                        <Route
                            exact
                            path={`/data/${item.url}`}
                            component={Auth(TableData, true, item.isAdmin, { ...item })}
                        />
                    );
                })}
            </Switch>
        </>
    );
}

export default DataPage;

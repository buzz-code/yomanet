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
                    const Component = Auth(TableData, true, item.isAdmin);
                    return (
                        <Route exact path={`/data/${item.url}`}>
                            <Component {...item} />
                        </Route>
                    );
                })}
            </Switch>
        </>
    );
}

export default DataPage;

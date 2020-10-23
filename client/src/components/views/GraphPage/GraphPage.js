import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../../../hoc/auth";
import graphConfig from "../../../config/graphConfig";
import GraphWithFilter from "../../widgets/GraphWithFilter";

function GraphPage(props) {
    return (
        <>
            <Switch>
                {graphConfig
                    .map((item) => {
                        return (
                            <Route
                                exact
                                path={`/graph/${item.url}`}
                                component={Auth(GraphWithFilter, true, item.isAdmin, { ...item })}
                            />
                        );
                    })}
            </Switch>
        </>
    );
}

export default GraphPage;

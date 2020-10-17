import React from "react";
import { Route, Switch } from "react-router-dom";
import Lesson from "./Lesson";
import Listening from "./Listening";
import Student from "./Student";

function DataPage(props) {
    return (
        <>
            <Switch>
                <Route exact path="/data/listening" component={Listening} />
                <Route exact path="/data/lesson" component={Lesson} />
                <Route exact path="/data/student" component={Student} />
            </Switch>
        </>
    );
}

export default DataPage;

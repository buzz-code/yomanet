import React from "react";
import { Route, Switch } from "react-router-dom";
import Lesson from "./Lesson";
import Listening from "./Listening";
import Student from "./Student";

function ReportPage(props) {
    return (
        <>
            <Switch>
                <Route exact path="/report/listening" component={Listening} />
                <Route exact path="/report/lesson" component={Lesson} />
                <Route exact path="/report/student" component={Student} />
            </Switch>
        </>
    );
}

export default ReportPage;

import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../../../hoc/auth";
import Lesson from "./Lesson";
import Listening from "./Listening";
import Student from "./Student";

function DataPage(props) {
    return (
        <>
            <Switch>
                <Route exact path="/data/listening" component={Auth(Listening, false)} />
                <Route exact path="/data/lesson" component={Auth(Lesson, false)} />
                <Route exact path="/data/student" component={Auth(Student, false)} />
            </Switch>
        </>
    );
}

export default DataPage;

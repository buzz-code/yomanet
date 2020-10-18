import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../../../hoc/auth";
import Lesson from "./Lesson";
import Listening from "./Listening";
import Student from "./Student";
import Conf from "./Conf";
import User from "./User";

function DataPage(props) {
    return (
        <>
            <Switch>
                <Route exact path="/data/listening" component={Auth(Listening, true)} />
                <Route exact path="/data/conf" component={Auth(Conf, true)} />
                <Route exact path="/data/lesson" component={Auth(Lesson, true)} />
                <Route exact path="/data/student" component={Auth(Student, true)} />
                <Route exact path="/data/user" component={Auth(User, true, true)} />
            </Switch>
        </>
    );
}

export default DataPage;

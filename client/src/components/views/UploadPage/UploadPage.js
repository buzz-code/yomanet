import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../../../hoc/auth";
import Lesson from "./Lesson";
import Listening from "./Listening";
import Student from "./Student";
import Conf from "./Conf";

function UploadPage(props) {
    return (
        <>
            <Switch>
                <Route exact path="/upload/listening" component={Auth(Listening, true)} />
                <Route exact path="/upload/conf" component={Auth(Conf, true)} />
                <Route exact path="/upload/lesson" component={Auth(Lesson, true)} />
                <Route exact path="/upload/student" component={Auth(Student, true)} />
            </Switch>
        </>
    );
}

export default UploadPage;

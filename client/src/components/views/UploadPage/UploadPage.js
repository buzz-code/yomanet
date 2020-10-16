import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../../../hoc/auth";
import Lesson from "./Lesson";
import Listening from "./Listening";
import Student from "./Student";
import Upload from "./Upload";

function UploadPage(props) {
    return (
        <>
            <Switch>
                <Route exact path="/upload/listening" component={Auth(Listening, false)} />
                <Route exact path="/upload/lesson" component={Auth(Lesson, false)} />
                <Route exact path="/upload/student" component={Auth(Student, false)} />
            </Switch>
        </>
    );
}

export default UploadPage;

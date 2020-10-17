import React from "react";
import { Route, Switch } from "react-router-dom";
import Lesson from "./Lesson";
import Listening from "./Listening";
import Student from "./Student";

function UploadPage(props) {
    return (
        <>
            <Switch>
                <Route exact path="/upload/listening" component={Listening} />
                <Route exact path="/upload/lesson" component={Lesson} />
                <Route exact path="/upload/student" component={Student} />
            </Switch>
        </>
    );
}

export default UploadPage;

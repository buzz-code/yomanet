import React from "react";
import { Route, Switch } from "react-router-dom";
import ListeningByKlassAndLesson from "./ListeningByKlassAndLesson";
// import Lesson from "./Lesson";
// import Student from "./Student";

function ReportPage(props) {
    return (
        <>
            <Switch>
                <Route exact path="/report/listeningByKlassAndLesson" component={ListeningByKlassAndLesson} />
                {/* <Route exact path="/report/lesson" component={Lesson} />
                <Route exact path="/report/student" component={Student} /> */}
            </Switch>
        </>
    );
}

export default ReportPage;

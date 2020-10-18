import React from "react";
import { Route, Switch } from "react-router-dom";
import ListeningByKlassAndLesson from "./ListeningByKlassAndLesson";
import ListeningByKlass from "./ListeningByKlass";

function ReportPage(props) {
    return (
        <>
            <Switch>
                <Route exact path="/report/listeningByKlassAndLesson" component={ListeningByKlassAndLesson} />
                <Route exact path="/report/listeningByKlass" component={ListeningByKlass} />
            </Switch>
        </>
    );
}

export default ReportPage;

import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../../../hoc/auth";
import ListeningByKlassAndLesson from "./ListeningByKlassAndLesson";
import ListeningByKlass from "./ListeningByKlass";

function ReportPage(props) {
    return (
        <>
            <Switch>
                <Route exact path="/report/listeningByKlassAndLesson" component={Auth(ListeningByKlassAndLesson, true)} />
                <Route exact path="/report/listeningByKlass" component={Auth(ListeningByKlass, true)} />
            </Switch>
        </>
    );
}

export default ReportPage;

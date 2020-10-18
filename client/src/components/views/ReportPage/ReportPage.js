import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../../../hoc/auth";
import ListeningByKlassAndLesson from "./ListeningByKlassAndLesson";
import ListeningByKlass from "./ListeningByKlass";
import ConfByKlass from "./ConfByKlass";

function ReportPage(props) {
    return (
        <>
            <Switch>
                <Route exact path="/report/listeningByKlassAndLesson" component={Auth(ListeningByKlassAndLesson, true)} />
                <Route exact path="/report/listeningByKlass" component={Auth(ListeningByKlass, true)} />
                <Route exact path="/report/confByKlass" component={Auth(ConfByKlass, true)} />
            </Switch>
        </>
    );
}

export default ReportPage;

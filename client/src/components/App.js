import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import UploadPage from "./views/UploadPage/UploadPage.js";
import DataPage from "./views/DataPage/DataPage.js";
import ReportPage from "./views/ReportPage/ReportPage.js";
import FilesPage from "./views/FilesPage/FilesPage.js";
import GraphPage from "./views/GraphPage/GraphPage.js";
import InstructionPage from "./views/InstructionPage/InstructionPage.js";
import WhatsNewPage from "./views/WhatsNewPage/WhatsNewPage.js";
import NavBar from "./widgets/NavBar/NavBar";
import Footer from "./widgets/Footer/Footer";
//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Auth(LandingPage, null)} />
                <Route path="/data" component={DataPage} />
                <Route path="/upload" component={UploadPage} />
                <Route path="/report" component={ReportPage} />
                <Route path="/files" component={FilesPage} />
                <Route path="/graph" component={GraphPage} />
                <Route exact path="/instruction" component={Auth(InstructionPage, null)} />
                <Route exact path="/whats-new" component={Auth(WhatsNewPage, null)} />
                <Route exact path="/login" component={Auth(LoginPage, false)} />
                <Route exact path="/register" component={Auth(RegisterPage, true, true)} />
            </Switch>
            <Footer />
        </Suspense>
    );
}

export default App;

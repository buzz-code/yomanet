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
import NavBar from "./widgets/NavBar/NavBar";
import Footer from "./widgets/Footer/Footer";
import Helmet from "./widgets/Helmet/Helmet";
//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Helmet />
            <NavBar />
            <Switch>
                <Route exact path="/" component={Auth(LandingPage, null)} />
                <Route path="/data" component={DataPage} />
                <Route path="/upload" component={UploadPage} />
                <Route path="/report" component={ReportPage} />
                <Route exact path="/login" component={Auth(LoginPage, false)} />
                <Route exact path="/register" component={Auth(RegisterPage, true, true)} />
            </Switch>
            <Footer />
        </Suspense>
    );
}

export default App;

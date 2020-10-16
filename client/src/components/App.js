import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import UploadPage from "./views/UploadPage/UploadPage.js";
import DataPage from "./views/DataPage/DataPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import Helmet from "./views/Helmet/Helmet";
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
                <Route exact path="/login" component={Auth(LoginPage, false)} />
                <Route exact path="/register" component={Auth(RegisterPage, false)} />
                <Route path="/data" component={Auth(DataPage, false)} />
                <Route exact path="/upload" component={Auth(UploadPage, false)} />
            </Switch>
            {/* <Footer /> */}
        </Suspense>
    );
}

export default App;

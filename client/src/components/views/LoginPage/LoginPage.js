import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Icon, Input, Button, Checkbox, Typography } from "antd";
import { useDispatch } from "react-redux";

const { Title } = Typography;

function LoginPage(props) {
    const dispatch = useDispatch();
    const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;
    const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : "";

    const [formErrorMessage, setFormErrorMessage] = useState("");
    const [rememberMe, setRememberMe] = useState(rememberMeChecked);
    const [email, setEmail] = useState(initialEmail);
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const dataToSubmit = {
            email,
            password,
        };
        dispatch(loginUser(dataToSubmit))
            .then((response) => {
                if (response.payload.loginSuccess) {
                    window.localStorage.setItem("userId", response.payload.userId);
                    if (rememberMe === true) {
                        window.localStorage.setItem("rememberMe", email);
                    } else {
                        localStorage.removeItem("rememberMe");
                    }
                    props.history.push("/");
                } else {
                    setFormErrorMessage("Check out your Account or Password again");
                }
            })
            .catch((err) => {
                setFormErrorMessage("Check out your Account or Password again");
                setTimeout(() => {
                    setFormErrorMessage("");
                }, 3000);
            });
    };

    return (
        <div className="container">
            <div className="main-content pt-3">
                <div className="container">
                    <h1>התחברות</h1>
                    <p className="lead">התחברות לחשבון.</p>
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">שם משתמש</label>
                            <input
                                type="text"
                                id="user"
                                name="email"
                                placeholder="הכנס שם משתמש"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">סיסמא</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="הכנס סיסמא"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {formErrorMessage && (
                            <label>
                                <p
                                    style={{
                                        color: "#ff0000bf",
                                        fontSize: "0.7rem",
                                        border: "1px solid",
                                        padding: "1rem",
                                        borderRadius: "10px",
                                    }}>
                                    {formErrorMessage}
                                </p>
                            </label>
                        )}
                        <div className="form-group">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                name="rememberMe"
                                className="form-check-inline"
                                value={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label htmlFor="rememberMe">זכור אותי לפעמים הבאות</label>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                            הכנס
                        </button>
                        &nbsp;
                        <a role="button" href="/" className="btn btn-default">
                            ביטול
                        </a>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default withRouter(LoginPage);

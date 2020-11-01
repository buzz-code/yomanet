import React from "react";
import "./Navbar.css";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { useLocation, withRouter } from "react-router-dom";
import { logoutUser } from "../../../_actions/user_actions";
import dataConfig from "../../../config/dataConfig";
import reportConfig from "../../../config/reportConfig";
import graphConfig from "../../../config/graphConfig";
import uploadConfig from "../../../config/uploadConfig";
import yemotFilesConfig from "../../../config/yemotFilesConfig";

function NavBar(props) {
    const userData = useSelector((state) => state.user.userData);
    const location = useLocation();

    const routes = [
        {
            label: "נתונים",
            value: "/data",
            children: dataConfig.map((item) => ({
                label: item.title,
                value: `/data/${item.url}`,
                isAdmin: item.isAdmin,
            })),
        },
        {
            label: "דוחות",
            value: "/report",
            children: reportConfig.map((item) => ({
                label: item.title,
                value: `/report/${item.url}`,
                isAdmin: item.isAdmin,
            })),
        },
        {
            label: "העלאת קובץ",
            value: "/upload",
            children: uploadConfig.map((item) => ({
                label: item.title,
                value: `/upload/${item.url}`,
            })),
        },
        {
            label: "קבצי ימות המשיח",
            value: "/files",
            children: yemotFilesConfig.map((item) => ({
                label: item.title,
                value: `/files/${item.url}`,
            })),
        },
        {
            label: "גרפים",
            value: "/graph",
            children: graphConfig.map((item) => ({
                label: item.title,
                value: `/graph/${item.url}`,
                isAdmin: item.isAdmin,
            })),
        },
        {
            label: "הוראות שימוש",
            value: "/instruction",
        },
        {
            label: "מה חדש?",
            value: "/whats-new",
        },
    ];

    const logoutHandler = () => {
        logoutUser().then((response) => {
            if (response.status === 200) {
                props.history.push("/login");
            } else {
                alert("Log Out Failed");
            }
        });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <a href="/" className="navbar-brand">
                {/* יומן Net */}
                {/* <img style={{ height: "42px" }} src="/1.jpg" alt="" /> */}
                <img style={{ height: "42px" }} src="/2.jpg" />
            </a>
            <button
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
                className="navbar-toggler">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div id="navbarNav" className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    {routes.map((item) =>
                        item.isAdmin && (!userData || !userData.isAdmin) ? null : item.children ? (
                            <li
                                className={clsx("nav-item dropdown", {
                                    active: item.children.map((item) => item.value).indexOf(location.pathname) > -1,
                                })}>
                                <button
                                    className="btn shadow-none nav-link dropdown-toggle"
                                    id="navbarDropdownMenuLink"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    {item.label}
                                </button>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    {item.children.map((item) =>
                                        item.isAdmin && (!userData || !userData.isAdmin) ? null : (
                                            <a href={item.value} title={item.label} className="dropdown-item">
                                                {item.label}
                                            </a>
                                        )
                                    )}
                                </div>
                            </li>
                        ) : (
                            <li
                                className={clsx("nav-item", {
                                    active:
                                        location.pathname.startsWith(item.value) &&
                                        (item.value !== "/" || location.pathname === "/"),
                                })}>
                                <a href={item.value} title={item.label} className="btn shadow-none nav-link">
                                    {item.label}
                                </a>
                            </li>
                        )
                    )}
                </ul>
                <ul className="navbar-nav">
                    {userData && userData.isAuth ? (
                        <li
                            className={clsx("nav-item dropdown", {
                                active: location.pathname.startsWith("/login"),
                            })}>
                            <a className="nav-link" onClick={logoutHandler}>
                                התנתקות
                            </a>
                        </li>
                    ) : (
                        <li
                            className={clsx("nav-item dropdown", {
                                active: location.pathname.startsWith("/login"),
                            })}>
                            <a className="nav-link" href="/login">
                                התחברות
                            </a>
                        </li>
                    )}
                    {userData && userData.isAdmin && (
                        <li
                            className={clsx("nav-item dropdown", {
                                active: location.pathname.startsWith("/register"),
                            })}>
                            <a className="nav-link" href="/register">
                                הרשמה
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default withRouter(NavBar);

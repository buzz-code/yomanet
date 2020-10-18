import React from "react";
import "./Navbar.css";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { useLocation, withRouter } from "react-router-dom";
import { logoutUser } from "../../../_actions/user_actions";

function NavBar(props) {
    const userData = useSelector((state) => state.user.userData);
    const location = useLocation();

    const routes = [
        {
            label: "נתונים",
            value: "/data",
            children: [
                { label: "נתוני האזנה", value: "/data/listening" },
                { label: "נתוני ועידה", value: "/data/conf" },
                { label: "נתוני שיעורים", value: "/data/lesson" },
                { label: "נתוני תלמידות", value: "/data/student" },
                { label: "נתוני משתמשים", value: "/data/user", isAdmin: true },
            ],
        },
        {
            label: "העלאת קובץ",
            value: "/upload",
            children: [
                { label: "הוספת נתוני האזנה", value: "/upload/listening" },
                { label: "הוספת נתוני ועידה", value: "/upload/conf" },
                { label: "עדכון נתוני שיעורים", value: "/upload/lesson", isAdmin: true },
                { label: "עדכון נתוני תלמידות", value: "/upload/student", isAdmin: true },
            ],
        },
        {
            label: "דוחות",
            value: "/report",
            children: [
                { label: "נתוני האזנה לפי כיתה ומקצוע", value: "/report/listeningByKlassAndLesson" },
                { label: "נתוני האזנה לפי כיתה", value: "/report/listeningByKlass" },
                { label: "נתוני ועידה לפי כיתה", value: "/report/confByKlass" },
            ],
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
        <nav className="navbar navbar-expand-md navbar-dark">
            <a href="/" className="navbar-brand">
                Vocal
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
                    <li
                        className={clsx("nav-item dropdown", {
                            active: location.pathname == "/",
                        })}>
                        <a className="nav-link" href="/">
                            בית
                        </a>
                    </li>
                    {routes.map((item) =>
                        item.isAdmin && (!userData || !userData.isAdmin) ? null : item.children ? (
                            <li
                                className={clsx("nav-item dropdown", {
                                    active: location.pathname.startsWith(item.value),
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
                                    active: location.pathname.startsWith(item.value),
                                })}>
                                <a href={item.value} title={item.label} className="nav-link">
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

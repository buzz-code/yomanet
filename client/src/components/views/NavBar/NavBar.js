import React from "react";
import "./Navbar.css";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { useLocation } from "react-router-dom";

function NavBar() {
    const userData = useSelector((state) => state.user.userData);
    const location = useLocation();

    const routes = [
        {
            label: "נתונים",
            value: "/data",
            children: [
                { label: "נתוני האזנה", value: "/data/listening" },
                { label: "נתוני שיעורים", value: "/data/lesson" },
                { label: "נתוני תלמידות", value: "/data/student" },
            ],
        },
        {
            label: "העלאת קובץ",
            value: "/upload",
            children: [
                { label: "הוספת נתוני האזנה", value: "/upload/listening" },
                { label: "עדכון נתוני שיעורים", value: "/upload/lesson" },
                { label: "עדכון נתוני תלמידות", value: "/upload/student" },
            ],
        },
        {
            label: "דוחות",
            value: "/report",
            children: [
                { label: "נתוני האזנה לפי כיתה ומקצוע", value: "/report/listeningByKlassAndLesson" },
                // { label: "עדכון נתוני שיעורים", value: "/report/lesson" },
                // { label: "עדכון נתוני תלמידות", value: "/report/student" },
            ],
        },
    ];
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
                        item.children ? (
                            <li
                                className={clsx("nav-item dropdown", {
                                    active: location.pathname.startsWith(item.value),
                                })}>
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdownMenuLink"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    {item.label}
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    {item.children.map((item) => (
                                        <a href={item.value} title={item.label} className="dropdown-item">
                                            {item.label}
                                        </a>
                                    ))}
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
                    <li
                        className={clsx("nav-item dropdown", {
                            active: location.pathname.startsWith("/login"),
                        })}>
                        <a className="nav-link" href="/login">
                            התחברות
                        </a>
                    </li>
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

export default NavBar;

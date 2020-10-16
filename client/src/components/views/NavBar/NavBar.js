import React from "react";
import "./Navbar.css";

function NavBar() {
    const routes = [
        { label: "בית", value: "/" },
        { label: "התחברות", value: "/login" },
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
                {/* todo: add loop here */}
                <ul className="navbar-nav">
                    {routes.map((item) =>
                        item.children ? (
                            <li class="nav-item dropdown">
                                <a
                                    class="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdownMenuLink"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    {item.label}
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    {item.children.map((item) => (
                                        <a href={item.value} title={item.label} className="dropdown-item">
                                            {item.label}
                                        </a>
                                    ))}
                                </div>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <a href={item.value} title={item.label} className="nav-link">
                                    {item.label}
                                </a>
                            </li>
                        )
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;

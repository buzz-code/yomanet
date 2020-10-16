import React from "react";
import "./Navbar.css";

function NavBar() {
    const routes = [
        { label: "בית", value: "/" },
        { label: "התחברות", value: "/login" },
        { label: "נתונים", value: "/data" },
        { label: "העלאת קובץ", value: "/upload" },
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
                    {routes.map((item) => (
                        <a href={item.value} title={item.label} className="nav-link">
                            {item.label}
                        </a>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;

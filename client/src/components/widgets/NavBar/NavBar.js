import React from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
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
            label: "טעינת קבצים ישירות מהמערכת",
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
            label: "פיתוחים עתידיים",
            value: "https://trello.com/b/3uKjhz1Q/",
        },
        // {
        //     label: "מה חדש?",
        //     value: "/whats-new",
        // },
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
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">
                <img style={{ height: "42px" }} src="/2.jpg" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto" activeKey={location.pathname}>
                    {routes.map((item) =>
                        item.isAdmin && (!userData || !userData.isAdmin) ? null : item.children ? (
                            <NavDropdown title={item.label} id={item.value}>
                                {item.children.map((item) =>
                                    item.isDivider ? (
                                        <NavDropdown.Divider />
                                    ) : item.isAdmin && (!userData || !userData.isAdmin) ? null : (
                                        <NavDropdown.Item href={item.value}>{item.label}</NavDropdown.Item>
                                    )
                                )}
                            </NavDropdown>
                        ) : (
                            <Nav.Link href={item.value}>{item.label}</Nav.Link>
                        )
                    )}
                </Nav>
                <Nav activeKey={location.pathname}>
                    {userData && userData.isAuth ? (
                        <Nav.Link onClick={logoutHandler}>התנתקות</Nav.Link>
                    ) : (
                        <Nav.Link href="/login">התחברות</Nav.Link>
                    )}
                    {userData && userData.isAdmin && <Nav.Link href="/register">הרשמה</Nav.Link>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default withRouter(NavBar);

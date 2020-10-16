import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../../../hoc/auth";
import Lesson from "./Lesson";
import Listening from "./Listening";
import Student from "./Student";

function DataPage(props) {
    const routes = [
        { label: "נתוני האזנה", value: "/data/listening" },
        { label: "נתוני השיעורים", value: "/data/lesson" },
        { label: "נתוני הבנות", value: "/data/student" },
    ];

    return (
        <>
            <div>
                {routes.map((item) => (
                    <a href={item.value} title={item.label} className="nav-link">
                        {item.label}
                    </a>
                ))}
            </div>
            <Switch>
                <Route exact path="/data/listening" component={Auth(Listening, false)} />
                <Route exact path="/data/lesson" component={Auth(Lesson, false)} />
                <Route exact path="/data/student" component={Auth(Student, false)} />
            </Switch>
        </>
    );
}

export default DataPage;

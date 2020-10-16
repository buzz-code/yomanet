import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../../../hoc/auth";
import LessonData from "./LessonData";
import ListeningData from "./ListeningData";
import StudentData from "./StudentData";

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
                <Route exact path="/data/listening" component={Auth(ListeningData, false)} />
                <Route exact path="/data/lesson" component={Auth(LessonData, false)} />
                <Route exact path="/data/student" component={Auth(StudentData, false)} />
            </Switch>
        </>
    );
}

export default DataPage;

import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../../../hoc/auth";
import Lesson from "./Lesson";
import Listening from "./Listening";
import Student from "./Student";
import Upload from "./Upload";

function UploadPage(props) {
    const routes = [
        { label: "נתוני האזנה", value: "/upload/listening" },
        { label: "נתוני השיעורים", value: "/upload/lesson" },
        { label: "נתוני הבנות", value: "/upload/student" },
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
                <Route exact path="/upload/listening" component={Auth(Listening, false)} />
                <Route exact path="/upload/lesson" component={Auth(Lesson, false)} />
                <Route exact path="/upload/student" component={Auth(Student, false)} />
            </Switch>
        </>
    );
}

export default UploadPage;

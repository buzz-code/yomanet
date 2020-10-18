import React from "react";
import { getUserData } from "../../../_actions/data_actions";
import TableData from "../../widgets/TableData";

function User() {
    return <TableData getData={getUserData} type="user" title="נתוני משתמשים" />;
}

export default User;

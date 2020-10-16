import React, { useEffect } from "react";
import moment from "moment";
import { Formik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../../_actions/data_actions";

function DataPage(props) {
    const dispatch = useDispatch();
    let data = useSelector((state) => state.data.data);

    useEffect(() => {
        dispatch(getData());
    }, []);

    return (
        <div className="container">
            <div className="main-content">
                <h1>נתוני האזנה</h1>
                <div>
                    {data && (
                        <table className="table table-striped table-hover table-sm">
                            <thead>
                                <tr>
                                    {data.headers.map((item) => (
                                        <th key={item.value}>{item.label}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.listeningData.map((item) => (
                                    <tr>
                                        {data.headers.map((header) => (
                                            <td>{item[header.value]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className="page-item disabled">
                                <a href="#" aria-label="Previous" className="page-link">
                                    <span aria-hidden="true">«</span>
                                </a>
                            </li>
                            <li className="page-item active">
                                <a href="#" className="page-link">
                                    1
                                </a>
                            </li>
                            <li className="page-item">
                                <a href="#" className="page-link">
                                    2
                                </a>
                            </li>
                            <li className="page-item">
                                <a href="#" className="page-link">
                                    3
                                </a>
                            </li>
                            <li className="page-item">
                                <a href="#" className="page-link">
                                    4
                                </a>
                            </li>
                            <li className="page-item">
                                <a href="#" className="page-link">
                                    5
                                </a>
                            </li>
                            <li className="page-item">
                                <a href="#" className="page-link">
                                    6
                                </a>
                            </li>
                            <li className="page-item">
                                <a href="#" className="page-link">
                                    7
                                </a>
                            </li>
                            <li className="page-item">
                                <a href="#" className="page-link">
                                    8
                                </a>
                            </li>
                            <li className="page-item">
                                <a href="#" aria-label="Next" className="page-link">
                                    <span aria-hidden="true">»</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default DataPage;

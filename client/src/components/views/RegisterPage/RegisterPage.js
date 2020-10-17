import React from "react";
import moment from "moment";
import { Formik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";

import { Form, Input, Button } from "antd";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

function RegisterPage(props) {
    const dispatch = useDispatch();
    return (
        <div className="container">
            <div className="main-content pt-3">
                <h1>הרשמה</h1>
                <p className="lead">פתיחת לחשבון חדש.</p>

                <Formik
                    initialValues={{
                        email: "",
                        name: "",
                        password: "",
                        confirmPassword: "",
                    }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().required("Name is required"),
                        email: Yup.string().email("Email is invalid").required("Email is required"),
                        password: Yup.string()
                            .min(6, "Password must be at least 6 characters")
                            .required("Password is required"),
                        confirmPassword: Yup.string()
                            .oneOf([Yup.ref("password"), null], "Passwords must match")
                            .required("Confirm Password is required"),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            let dataToSubmit = {
                                email: values.email,
                                password: values.password,
                                name: values.name,
                                image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
                            };

                            dispatch(registerUser(dataToSubmit)).then((response) => {
                                if (response.payload.success) {
                                    props.history.push("/login");
                                } else {
                                    alert(response.payload.err.errmsg);
                                }
                            });

                            setSubmitting(false);
                        }, 500);
                    }}>
                    {(props) => {
                        const {
                            values,
                            touched,
                            errors,
                            dirty,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            handleReset,
                        } = props;
                        return (
                            <Form style={{ minWidth: "375px" }} {...formItemLayout} onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">שם משתמש</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        placeholder="הכנס שם משתמש"
                                        className={errors.name && touched.name ? "form-control error" : "form-control"}
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.name && touched.name && <div className="input-feedback">{errors.name}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">דוא"ל</label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        required
                                        placeholder="הכנס דוא''ל"
                                        className={
                                            errors.email && touched.email ? "form-control error" : "form-control"
                                        }
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.email && touched.email && (
                                        <div className="input-feedback">{errors.email}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">סיסמא</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        required
                                        placeholder="הכנס סיסמא"
                                        className={
                                            errors.password && touched.password ? "form-control error" : "form-control"
                                        }
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.password && touched.password && (
                                        <div className="input-feedback">{errors.password}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">אשר סיסמא</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        required
                                        placeholder="אישור סיסמא"
                                        className={
                                            errors.confirmPassword && touched.confirmPassword
                                                ? "form-control error"
                                                : "form-control"
                                        }
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.confirmPassword && touched.confirmPassword && (
                                        <div className="input-feedback">{errors.confirmPassword}</div>
                                    )}
                                </div>
                                <Form.Item {...tailFormItemLayout}>
                                    <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
}

export default RegisterPage;

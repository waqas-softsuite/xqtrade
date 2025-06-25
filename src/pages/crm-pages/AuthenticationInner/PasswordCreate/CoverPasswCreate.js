import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Row, Form, Label, Input, FormFeedback } from 'reactstrap';
import AuthSlider from '../authCarousel';

// formik
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CoverPasswCreate = () => {
    document.title = "Create New Password";

    const [currentPasswordShow, setCurrentPasswordShow] = useState(false);
    const [passwordShow, setPasswordShow] = useState(false);
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            current_password: "",
            password: "",
            confirm_password: "",
        },
        validationSchema: Yup.object({
            current_password: Yup.string().required("Current Password is required"),
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .matches(RegExp('(.*[a-z].*)'), 'At least lowercase letter')
                .matches(RegExp('(.*[A-Z].*)'), 'At least uppercase letter')
                .matches(RegExp('(.*[0-9].*)'), 'At least one number')
                .required("This field is required"),
            confirm_password: Yup.string()
                .oneOf([Yup.ref("password")], "Both passwords need to be the same")
                .required("Confirm Password is required"),
        }),
        onSubmit: (values) => {
            console.log(values);
        }
    });

    return (
        <React.Fragment>
            <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay"></div>
                <div className="auth-page-content overflow-hidden pt-lg-5">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <Card className="overflow-hidden">
                                    <Row className="justify-content-center g-0">
                                        <AuthSlider />
                                        <Col lg={6}>
                                            <div className="p-lg-5 p-4">
                                                <h5 className="text-primary">Create new password</h5>
                                                <p className="text-muted">Your new password must be different from the previously used password.</p>

                                                <div className="p-2">
                                                    <Form onSubmit={validation.handleSubmit} action="/auth-signin-basic">
                                                        {/* Current Password Field */}
                                                        <div className="mb-3">
                                                            <Label className="form-label" htmlFor="current-password-input">Current Password</Label>
                                                            <div className="position-relative auth-pass-inputgroup">
                                                                <Input
                                                                    type={currentPasswordShow ? "text" : "password"}
                                                                    className="form-control pe-5 password-input"
                                                                    placeholder="Enter current password"
                                                                    id="current-password-input"
                                                                    name="current_password"
                                                                    value={validation.values.current_password}
                                                                    onBlur={validation.handleBlur}
                                                                    onChange={validation.handleChange}
                                                                    invalid={validation.errors.current_password && validation.touched.current_password ? true : false}
                                                                />
                                                                {validation.errors.current_password && validation.touched.current_password ? (
                                                                    <FormFeedback type="invalid">{validation.errors.current_password}</FormFeedback>
                                                                ) : null}
                                                                <Button color="link" onClick={() => setCurrentPasswordShow(!currentPasswordShow)} className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon">
                                                                    <i className="ri-eye-fill align-middle"></i>
                                                                </Button>
                                                            </div>
                                                        </div>

                                                        {/* New Password Field */}
                                                        <div className="mb-3">
                                                            <Label className="form-label" htmlFor="password-input">New Password</Label>
                                                            <div className="position-relative auth-pass-inputgroup">
                                                                <Input
                                                                    type={passwordShow ? "text" : "password"}
                                                                    className="form-control pe-5 password-input"
                                                                    placeholder="Enter new password"
                                                                    id="password-input"
                                                                    name="password"
                                                                    value={validation.values.password}
                                                                    onBlur={validation.handleBlur}
                                                                    onChange={validation.handleChange}
                                                                    invalid={validation.errors.password && validation.touched.password ? true : false}
                                                                />
                                                                {validation.errors.password && validation.touched.password ? (
                                                                    <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                                                                ) : null}
                                                                <Button color="link" onClick={() => setPasswordShow(!passwordShow)} className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon">
                                                                    <i className="ri-eye-fill align-middle"></i>
                                                                </Button>
                                                            </div>
                                                            <div id="passwordInput" className="form-text">Must be at least 8 characters.</div>
                                                        </div>

                                                        {/* Confirm Password Field */}
                                                        <div className="mb-3">
                                                            <Label className="form-label" htmlFor="confirm-password-input">Confirm New Password</Label>
                                                            <div className="position-relative auth-pass-inputgroup">
                                                                <Input
                                                                    type={confirmPasswordShow ? "text" : "password"}
                                                                    className="form-control pe-5 password-input"
                                                                    placeholder="Confirm new password"
                                                                    id="confirm-password-input"
                                                                    name="confirm_password"
                                                                    value={validation.values.confirm_password}
                                                                    onBlur={validation.handleBlur}
                                                                    onChange={validation.handleChange}
                                                                    invalid={validation.errors.confirm_password && validation.touched.confirm_password ? true : false}
                                                                />
                                                                {validation.errors.confirm_password && validation.touched.confirm_password ? (
                                                                    <FormFeedback type="invalid">{validation.errors.confirm_password}</FormFeedback>
                                                                ) : null}
                                                                <Button color="link" onClick={() => setConfirmPasswordShow(!confirmPasswordShow)} className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon">
                                                                    <i className="ri-eye-fill align-middle"></i>
                                                                </Button>
                                                            </div>
                                                        </div>

                                                        <div id="password-contain" className="p-3 bg-light mb-2 rounded">
                                                            <h5 className="fs-13">Password must contain:</h5>
                                                            <p className="fs-12 mb-2">Minimum <b>8 characters</b></p>
                                                            <p className="fs-12 mb-2">At least <b>one lowercase letter</b> (a-z)</p>
                                                            <p className="fs-12 mb-2">At least <b>one uppercase letter</b> (A-Z)</p>
                                                            <p className="fs-12 mb-0">At least <b>one number</b> (0-9)</p>
                                                        </div>

                                                        <div className="form-check">
                                                            <Input className="form-check-input" type="checkbox" value="" id="auth-remember-check" />
                                                            <Label className="form-check-label" htmlFor="auth-remember-check">Remember me</Label>
                                                        </div>

                                                        <div className="mt-4">
                                                            <Button color="success" className="w-100" type="submit">Reset Password</Button>
                                                        </div>
                                                    </Form>
                                                </div>

                                                <div className="mt-5 text-center">
                                                    <p className="mb-0">Wait, I remember my password... <Link to="/login" className="fw-semibold text-primary text-decoration-underline"> Click here </Link> </p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </React.Fragment>
    );
};

export default CoverPasswCreate;

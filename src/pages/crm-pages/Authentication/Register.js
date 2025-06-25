import React, { useCallback } from "react";
import { Row, Col, CardBody, Card, Container, Input, Label, Form, FormFeedback, Alert, UncontrolledAlert, Button, ButtonGroup } from "reactstrap";
import Select from 'react-select';
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import countryList from "react-select-country-list";
import { logoLight } from '../../../utils/config';
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { PhoneNumberUtil } from 'google-libphonenumber';

import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearRegisterState, clearErrors } from "../../../rtk/slices/crm-slices/auth/registerSlice";
import { checkReferral } from "../../../rtk/slices/checkReferralSlice/checkReferralSlice";
import debounce from "lodash.debounce";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "../../../Components/LanguageSwitcher";

const Register = () => {
    const phoneUtil = PhoneNumberUtil.getInstance();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();    

    const { loading, token, errorMessage, fieldErrors } = useSelector((state) => state.register);
    const { fullname: refName, email: refEmail, errorMessage: refError, status } = useSelector((state) => state.checkReferral);

    const countryOptions = countryList().getData().map(country => ({
        value: country.value, // This is the country code (e.g., "PK")
        label: country.label, // This is the country name (e.g., "Pakistan")
        mobileCode: `+${phoneUtil.getCountryCodeForRegion(country.value)}` // Generate mobile code
    }));

    const queryParams = new URLSearchParams(location.search);
    const refNumFromUrl = queryParams.get('reff_code'); // This will get the value of reff_code from the query string

    // Debounced checkReferral API call
    const debouncedCheckReferral = useCallback(
        debounce((value) => {
            dispatch(checkReferral({ reff_code: value }));
        }, 500), // 500ms delay before API call
        [] // Empty array ensures it's created only once
    );
    React.useEffect(() => {
        if (token) {
            navigate('/dashboard'); // Redirect after successful registration
            dispatch(clearRegisterState());
        }
    }, [token, navigate, dispatch]);

    React.useEffect(() => {
        if (refNumFromUrl) {
            dispatch(checkReferral({ reff_code: refNumFromUrl }));
        }
    }, [dispatch, refNumFromUrl]);

    const validation = useFormik({
        enableReinitialize: true,

        initialValues: {
            email: '',
            password: '',
            // confirm_password: '',
            first_name: '',
            last_name: '',
            country: '',
            country_code: '',
            mobile_code: '',
            mobile: '',
            reff_code: refNumFromUrl || '', // ✅ added
        },
        validationSchema: Yup.object({
            email: Yup.string().required(t('Please Enter Your Email')),
            password: Yup.string().required(t('Please Enter Your Password')).min(6, t('The password field must be at least 6 characters.')),
            reff_code: Yup.string(), // optional validation

        }),
        onSubmit: (values) => {
            dispatch(registerUser({
                email: values.email,
                password: values.password,
                first_name: "N/A",
                last_name: "N/A",
                country: "N/A",
                country_code: "N/A",
                mobile_code: "N/A",
                mobile: "N/A",
                reff_code: status === true ? values.reff_code : "" 
            }));
        }
    });
    

    document.title = "Basic SignUp";

    return (
        <React.Fragment>

            <div className="auth-page-content mt-5 pt-5">
                <Container>
                    <LanguageSwitcher />
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <div className="text-center mt-sm-5 mb-1 text-white-50">
                                <div>
                                    <Link to="/" className="d-inline-block auth-logo">
                                        <img src={logoLight} alt="" style={{ width: '55%' }} />
                                    </Link>

                                    <ButtonGroup style={{ border: '1px solid #1e90ff', borderRadius: '20px', width: '100%', marginTop: '45px' }}>
                                        <Button style={{
                                            backgroundColor: location.pathname === "/register" ? "#1e90ff" : "transparent",
                                            border: '0px',
                                            borderRadius: '20px 0px 0px 20px',
                                            color: location.pathname === "/register" ? "#000000" : "#1e90ff",
                                            width: '50%', padding: '5px'
                                        }}
                                            onClick={() => navigate('/register')}
                                        >
                                            {t('Registration')}
                                        </Button>
                                        <Button style={{
                                            backgroundColor: location.pathname === "/register" ? "transparent" : "#1e90ff",
                                            border: '0px',
                                            borderRadius: '0px 20px 20px 0px',
                                            color: location.pathname === "/register" ? "#1e90ff" : "#000000",
                                            width: '50%', padding: '5px'
                                        }}
                                            onClick={() => navigate('/login')}
                                        >
                                            {t('Login')}
                                        </Button>
                                    </ButtonGroup>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="mt-1 bg-transparent">
                                <CardBody className="p-0">
                                    <div className="p-2 mt-4">
                                        <Form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                validation.handleSubmit();
                                                return false;
                                            }}
                                            className="needs-validation" action="#">

                                            <div className="mb-3">
                                                <Input
                                                    id="reff_code"
                                                    name="reff_code"
                                                    className="form-control fs-4"
                                                    placeholder={t('Enter Referral Code (optional)')}
                                                    type="text"
                                                    onChange={(e) => {
                                                        validation.handleChange(e);
                                                        debouncedCheckReferral(e.target.value); // Call the debounced function
                                                    }}
                                                    onBlur={(e) => {
                                                        validation.handleBlur(e);
                                                    }}
                                                    value={validation.values.reff_code || ""}
                                                    style={{ backgroundColor: "#121212" }}
                                                />
                                                {
                                                    status === true && refName && (
                                                        <small className="text-success">Referred by: {refName} ({refEmail})</small>
                                                    )
                                                }

                                                {status === false && (
                                                    <small className="text-danger">Invalid Referral Code, can still proceed registering</small>
                                                )}
                                            </div>

                                            <div className="mb-3">
                                                <Row>
                                                    <Col xs={12}>
                                                        {/* <Label htmlFor="useremail" className="form-label">Email <span className="text-danger">*</span></Label> */}
                                                        <Input
                                                            id="email"
                                                            name="email"
                                                            className="form-control fs-4"
                                                            placeholder={t('Enter Email')}
                                                            type="email"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.email || ""}
                                                            invalid={validation.touched.email && validation.errors.email}
                                                            style={{ backgroundColor: "#121212" }}
                                                        />
                                                        {validation.touched.email && validation.errors.email ? (
                                                            <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                </Row>
                                            </div>


                                            <div className="mb-3">
                                                <Row>
                                                    <Col xs={12} className="mb-3 mb-md-0">
                                                        {/* <Label htmlFor="userpassword" className="form-label">Password <span className="text-danger">*</span></Label> */}
                                                        <Input
                                                            name="password"
                                                            type="password"
                                                            placeholder={t('Enter Password')}
                                                            className="fs-4"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.password || ""}
                                                            invalid={validation.touched.password && validation.errors.password}
                                                            style={{ backgroundColor: "#121212" }}
                                                        />
                                                        {validation.touched.password && validation.errors.password ? (
                                                            <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                                                        ) : null}
                                                    </Col>

                                                </Row>
                                            </div>
                                            <div className="mt-4">
                                                <Button className="depositButtonLite justify-content-center w-100 fs-5" type="submit" disabled={loading}>
                                                    {loading ? t('Registration')+'...' : t('Registration')}
                                                </Button>
                                                {(errorMessage || fieldErrors.email) && (
                                                    <UncontrolledAlert color="danger" className="alert-border-left mt-2 mb-xl-0">
                                                        <i className="ri-error-warning-line me-3 align-middle fs-16"></i>
                                                        <strong>
                                                            {errorMessage}
                                                            {fieldErrors.email && ` - ${fieldErrors.email[0]}`}
                                                        </strong>
                                                    </UncontrolledAlert>
                                                )}
                                            </div>
                                        </Form>

                                    </div>
                                </CardBody>
                            </Card>

                        </Col>
                    </Row>
                </Container>
            </div>

        </React.Fragment>
    );
};

export default Register;

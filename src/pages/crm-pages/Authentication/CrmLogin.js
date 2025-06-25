import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Form, FormFeedback, Alert, Spinner, ButtonGroup } from 'reactstrap';
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import withRouter from "../../../Components/Common/withRouter";
import * as Yup from "yup";
import { useFormik } from "formik";
import { logoLight } from '../../../utils/config';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../rtk/slices/crm-slices/auth/authSlice';
import { tradeAccountsList } from '../../../rtk/slices/crm-slices/trade/tradeAccountsList';
import { getUserDashboard } from '../../../rtk/slices/crm-slices/userDashboard/userDashboard';
import { useTranslation } from 'react-i18next';
import GoogleLoginButton from './GoogleLoginButton';
import FacebookLoginButton from './FacebookLoginButton';
import LanguageSwitcher from '../../../Components/LanguageSwitcher';

const CrmLogin = (props) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.auth);
    const [passwordShow, setPasswordShow] = useState(false);
    const { tradeAccount } = useSelector((state) => state.tradeAccountsList) || {};
    const { t } = useTranslation();

    const handleSubmit = async (values) => {
        try {
            let token;

            // 🔹 Step 1: Always Call Login API (Even If Token Exists)
            const response = await dispatch(loginUser(values)).unwrap(); // Wait for login response
            token = response?.access_token; // Assuming loginUser returns the token

            if (token) {
                localStorage.setItem("token", token); // ✅ Override previous token
            } else {
                throw new Error("Token not received after login.");
            }

            // 🔹 Step 2: Fetch userDashboard data with New Token
            const userDashboardResponse = await dispatch(getUserDashboard(token)).unwrap();
            const { user, trade_accounts, deposits, withdrawals, commission } = userDashboardResponse;

            // 🔹 Step 3: Handle trade accounts logic
            const localUser = JSON.parse(localStorage.getItem('user')) || {};

            if (!localUser?.account) {
                if (trade_accounts?.length === 1) {
                    localStorage.setItem('user', JSON.stringify({ account: trade_accounts[0]?.account }));
                } else if (trade_accounts?.length > 1) {
                    const latestAccount = trade_accounts.reduce((latest, account) =>
                        new Date(account.created_at) > new Date(latest.created_at) ? account : latest, trade_accounts[0]
                    );
                    localStorage.setItem('user', JSON.stringify({ account: latestAccount.account }));
                }
            }

            // 🔹 Step 4: Store userDashboard data in localStorage
            localStorage.setItem('crm-user', JSON.stringify({ user, trade_accounts, deposits, withdrawals, commission }));

            // 🔹 Step 5: Navigate to dashboard
            navigate('/user-dashboard');

        } catch (error) {
            console.error("Login error:", error);
        }
    };




    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().required(t('Please Enter Your Email')),
            password: Yup.string().required(t('Please Enter Your Password')),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        }
    });

    document.title = "SignIn | Trading Dashboard";
    return (
        <React.Fragment>
            {/* <ParticlesAuth> */}
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
                                </div>

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
                                            action="#">

                                            <div className="mb-3">
                                                {/* <Label htmlFor="email" className="form-label">Email</Label> */}
                                                <Input
                                                    name="email"
                                                    className="form-control fs-4"
                                                    placeholder={t('Enter Email')}
                                                    type="email"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.email || ""}
                                                    invalid={
                                                        validation.touched.email && validation.errors.email ? true : false
                                                    }
                                                    style={{ backgroundColor: "#121212" }}
                                                />
                                                {validation.touched.email && validation.errors.email ? (
                                                    <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">

                                                {/* <Label className="form-label" htmlFor="password-input">Password</Label> */}
                                                <div className="position-relative auth-pass-inputgroup mb-3 d-flex w-100 align-items-center flex-column">
                                                    <Input
                                                        name="password"
                                                        value={validation.values.password || ""}
                                                        type={passwordShow ? "text" : "password"}
                                                        className="form-control fs-4"
                                                        placeholder={t('Enter Password')}
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        invalid={
                                                            validation.touched.password && validation.errors.password ? true : false
                                                        }
                                                        style={{ backgroundColor: "#121212" }}
                                                    />


                                                    <button
                                                        style={{
                                                            display: (validation.touched.password && validation.errors.password) ? "none" : "block",
                                                        }}
                                                        className="btn h-100 btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                                                        type="button" id="password-addon" onClick={() => setPasswordShow(!passwordShow)}>
                                                        <i className="ri-eye-fill align-middle"></i>
                                                    </button>



                                                    {validation.touched.password && validation.errors.password ? (
                                                        <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                                                    ) : null}
                                                </div>


                                            </div>
                                            <div className="float-start mb-3">
                                                <Link to="/forgot-password" style={{ color: "#1e90ff" }}>{t('Forgot Password?')}</Link>
                                            </div>


                                            <div className="mt-4">

                                                <Button
                                                    disabled={status === 'loading'}
                                                    className="depositButtonLite justify-content-center w-100 fs-5" type="submit">
                                                    {status === 'loading' ? <Spinner size="sm" /> : t('Login')}
                                                </Button>
                                            </div>



                                        </Form>

                                        <div className="mt-4 d-flex justify-content-center align-items-center">
                                            <GoogleLoginButton />
                                            {/* <FacebookLoginButton/> */}
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>


                            {error && (
                                <Alert color="danger">
                                    {typeof error === 'string' ? error : error.message || 'An error occurred'}
                                </Alert>
                            )}
                        </Col>
                    </Row>

                </Container>
            </div>
            {/* </ParticlesAuth> */}
        </React.Fragment>
    );
};

export default withRouter(CrmLogin);

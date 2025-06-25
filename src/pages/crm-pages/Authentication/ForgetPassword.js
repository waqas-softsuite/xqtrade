import PropTypes from "prop-types";
import React from "react";
import { Row, Col, Alert, Card, CardBody, Container, FormFeedback, Input, Label, Form } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import withRouter from "../../../Components/Common/withRouter";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { useTranslation } from 'react-i18next';
import { logoLight } from "../../../utils/config";
import { resetPassword } from "../../../rtk/slices/resetPasswordSlice/resetSlice";


const ForgetPasswordPage = props => {
  // const dispatch = useDispatch();
  const dispatch = useDispatch();
  const { loading, successMessage, errorMessage } = useSelector((state) => state.resetPassword);
  const { t } = useTranslation();
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required(t('Please Enter Your Email')),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log('forget password:', values);
      dispatch(resetPassword(values)).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          resetForm();
        }
      })
    }
  });



  document.title = "Reset Password | Forex";
  return (
    // <ParticlesAuth>
    <div className="auth-page-content mt-5 pt-5">

      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} xl={7}>
            <div className="text-center mt-sm-5 mb-4 text-white-50">
              <div>
                <Link to="/" className="d-inline-block auth-logo">
                  <img src={logoLight} alt="" style={{ width: '55%' }} />
                </Link>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="mt-4 theme-bg">
              {/* <LanguageSwitcher /> */}
              <CardBody className="p-4">
                <div className="text-center mt-2">
                  <h5 className="text-secondary">{t('Forgot Password?')}</h5>
                  <p className="text-muted">{t('Reset Password')}</p>

                  <lord-icon
                    src="https://cdn.lordicon.com/rhvddzym.json"
                    trigger="loop"
                    colors="primary:#0ab39c"
                    className="avatar-xl"
                    style={{ width: "120px", height: "120px" }}
                  >
                  </lord-icon>

                </div>

                <Alert className="border-0 text-center mb-2 mx-2" role="alert" color="secondary">
                  {t('Enter your email and instructions will be sent to you!')}
                </Alert>
                <div className="p-2">
                  {/* {forgetError && forgetError ? (
                      <Alert color="danger" style={{ marginTop: "13px" }}>
                        {forgetError}
                      </Alert>
                    ) : null}
                    {forgetSuccessMsg ? (
                      <Alert color="success" style={{ marginTop: "13px" }}>
                        {forgetSuccessMsg}
                      </Alert>
                    ) : null} */}
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                  >
                    <div className="mb-4">
                      <Label className="form-label">{t('Email')}</Label>
                      <Input
                        name="email"
                        className="form-control"
                        placeholder={t('Enter Email')}
                        type="email"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.email || ""}
                        invalid={
                          validation.touched.email && validation.errors.email ? true : false
                        }
                      />
                      {validation.touched.email && validation.errors.email ? (
                        <FormFeedback type="invalid"><div>{validation.errors.email}</div></FormFeedback>
                      ) : null}
                    </div>

                    <div className="text-center mt-4">
                      <button className="btn btn-secondary w-100" type="submit">{t('Send Reset Link')}</button>
                    </div>
                  </Form>
                </div>
              </CardBody>
            </Card>

            <div className="mt-4 text-center">
              <p className="mb-0">{t('Wait, I remember my password')}... <Link to="/login" className="fw-semibold text-secondary text-decoration-underline"> {t('Click here')} </Link> </p>
            </div>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

          </Col>
        </Row>
      </Container>
    </div>
    // </ParticlesAuth>
  );
};

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ForgetPasswordPage);
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { token } from '../../../utils/config';
import { createDeposit } from '../../../rtk/slices/crm-slices/deposite/getDepositeFormSlice'
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Toast, ToastBody, ToastHeader, Spinner, Alert, Button, FormGroup, Row, Col } from "reactstrap";
import Step1Component from './Step1Component';
import { depositStepOneSubmit } from '../../../rtk/slices/crm-slices/deposite/stepOneFormSubmitSlice'
import { depositStepTwoSubmit } from '../../../rtk/slices/crm-slices/deposite/stepTwoFormSubmitSlice'
import Step2Component from './Step2Component';
import { useTranslation } from 'react-i18next';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const MultiStepForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { gateways, tradeAccounts, status, error } = useSelector((state) => state.deposit);

    const { t } = useTranslation();


    const [formData, setFormData] = useState({});
    const [selectedGateway, setSelectedGateway] = useState(null);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [amount, setAmount] = useState("");
    const [toast, setToast] = useState({ visible: false, message: "", type: "" });
    const [loading, setLoading] = useState(false)


    const extractedCurrency = selectedGateway?.currency || "";


    const handlegatewaysChange = (selectedValue) => {

        if (!selectedValue) {
            console.error("Selected gateway is undefined!");
            return;
        }

        const selectedMethod = gateways.find(
            (method) => method.method_code === selectedValue
        );

        if (!selectedMethod) {
            console.error("No gateway method found for value:");
            return;
        }

        setSelectedGateway(selectedMethod);
    };


    const handleAccountChange = (e) => {
        const accountId = e.target.value;
        setSelectedAccount(tradeAccounts.find(account => account.id === parseInt(accountId)));


    };

    const handleAmountChange = (e) => {
        const amountValue = e.target.value
        setAmount(amountValue)
    }


    const step1ValidationSchema = Yup.object({
        gateway: Yup.string().required("Gateway method is required."),
        account: Yup.string()
            .required("Account selection is required.")
        // .test("marginFreeCheck", "Selected account has no margin free.", function (value) {
        //     const selectedAccount = tradeAccounts.find((account) => account.id === parseInt(value));
        //     return selectedAccount ? selectedAccount.marginFree > 0 : true; // Check if marginFree is greater than 0
        // })
        ,
        amount: Yup.number()
            .required("Amount is required.")
            .positive("Amount must be greater than 0.")
        // .test("maxMarginFree", "Amount must be less than or equal to margin free.", function (value) {
        //     const selectedAccount = tradeAccounts.find((account) => account.id === parseInt(this.parent.account));
        //     return selectedAccount ? value <= selectedAccount.marginFree : true; // Check if amount <= marginFree
        // }),
    });


    const step2ValidationSchema = Yup.object(
        selectedGateway?.method?.forms?.form_data &&
        Object.keys(selectedGateway.method?.forms?.form_data).reduce((acc, key) => {
            const field = selectedGateway.method?.forms?.form_data[key];

            if (field.is_required === "required") {
                if (field.type === "file") {
                    // Validation for file type dynamically based on the "extensions" property
                    const allowedExtensions = field.extensions.split(','); // Assuming extensions is a comma-separated string
                    acc[key] = Yup.mixed()
                        .required(`${field.label} is required.`)
                        .test(
                            "fileType",
                            `Only ${allowedExtensions.join(', ')} files are allowed.`,
                            (value) => {
                                if (!value) return false; // Ensure the file is provided
                                // Check if the file type matches the allowed extensions
                                return allowedExtensions.includes(value.type.split('/')[1]);
                            }
                        );
                } else {
                    // Default validation for other fields
                    acc[key] = Yup.string().required(`${field.label} is required.`);
                }
            }

            return acc;
        }, {})
    );




    const [currentStep, setCurrentStep] = useState(1);

    const handleNextStep = async (values, { setSubmitting }) => {

        const payload = {
            gateway: values.gateway,
            amount: values.amount,
            trade_account: values.account,
            currency: extractedCurrency,
        };

        try {
            const response = await dispatch(depositStepOneSubmit(payload)).unwrap();
            setFormData((prevData) => ({
                ...prevData,
                ...values,
            }));
            setCurrentStep(2);

        } catch (err) {
            setToast({ visible: true, message: err.message || "Error in Step 1", type: "danger" });
            console.error("Error submitting Step 1:", err);
            setSubmitting(false);
        }
    };

    const handlePreviousStep = () => {
        setCurrentStep(1);
    };

    const handleSubmit = async (values) => {
        const finalData = { ...values };

        const formData = new FormData();
        for (const key in finalData) {
            if (key === 'transaction_proof' && finalData[key] instanceof File) {
                formData.append(key, finalData[key]);
            } else {
                formData.append(key, finalData[key]);
            }
            setLoading(true);
        }


        try {
            const response = await dispatch(depositStepTwoSubmit(formData)).unwrap();
            setToast({ visible: true, message: response.message, type: "success" });

            setTimeout(() => {
                navigate("/deposit/history"); // Navigate after showing the toast
            }, 3000);
        } catch (err) {
            setToast({ visible: true, message: err.response?.data?.message || err.message, type: "danger" });
            console.error(
                "Error submitting Step 2:",
                err.response?.data || err.message
            );
        }

    };

    useEffect(() => {
        dispatch(createDeposit(token)); // Ensure data is loaded

    }, [dispatch]);

    if (status === "loading") {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <Spinner color="primary" />
            </div>
        );
    }

    if (status === "error") {
        return <Alert color="danger">Error: {error}</Alert>;
    }





    return (
        <>
            <div className="container mt-4">
                {toast.visible && (
                    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
                        <Toast isOpen={toast.visible}>
                            <ToastHeader
                                icon={toast.type === "success" ? "success" : "danger"}
                                toggle={() => setToast({ ...toast, visible: false })}
                            >
                                {toast.type === "success" ? "Success" : "Error"}
                            </ToastHeader>
                            <ToastBody>{toast.message}</ToastBody>
                        </Toast>
                    </div>
                )}

                {currentStep === 1 && (
                    <Formik
                        initialValues={{
                            gateway: formData.gateway || "",
                            account: formData.account || "",
                            amount: formData.amount || "",
                        }}
                        validationSchema={step1ValidationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            handleNextStep(values, { setSubmitting });  // ✅ Pass setSubmitting properly
                        }}
                    >
                        {({ setFieldValue }) => (
                            <Form>
                                <Step1Component
                                    gateways={gateways || []}
                                    tradeAccounts={tradeAccounts || []}
                                    // handlegatewaysChange={handlegatewaysChange}
                                    handlegatewaysChange={(selectedOption) => {
                                        setFieldValue("gateway", selectedOption?.value); // ✅ update Formik
                                        handlegatewaysChange(selectedOption?.value);     // ✅ your local handler
                                    }}
                                    handleAccountChange={(e) => {
                                        setFieldValue("account", e.target.value);
                                        handleAccountChange(e);
                                    }}
                                    handleAmountChange={(e) => {
                                        setFieldValue("amount", e.target.value);
                                        handleAmountChange(e);
                                    }}

                                    amount={amount}
                                />
                                <FormGroup>
                                    <Button className='depositButtonLite' type="submit" block>
                                        {t('Next')}
                                    </Button>
                                </FormGroup>
                            </Form>
                        )}
                    </Formik>


                )}

                {currentStep === 2 && selectedGateway?.method?.forms?.form_data && (
                    <Formik
                        initialValues={{
                            ...formData,
                            ...Object.keys(selectedGateway?.method?.forms?.form_data || {}).reduce(
                                (acc, key) => ({ ...acc, [key]: "" }),
                                {}
                            ),
                        }}
                        validationSchema={step2ValidationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ setFieldValue, values }) => (
                            <Form>
                                <Step2Component
                                    selectedGateway={selectedGateway}
                                    setFieldValue={setFieldValue}
                                    formValues={values}
                                />

                                <Row className="mt-3">
                                    <Col md={6}>
                                        <Button className='actionButtonLite mb-2' onClick={handlePreviousStep} block disabled={loading}>
                                            {t("Previous")}
                                        </Button>
                                    </Col>
                                    <Col md={6}>
                                        <Button className='depositButtonLite mb-5' type="submit" block disabled={loading}>
                                            {loading ? <Spinner size="sm" /> : t("Submit")}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        )}
                    </Formik>
                )}
            </div>
        </>
    )
}

export default MultiStepForm
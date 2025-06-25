import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, FormGroup, Label, Input, Card, CardBody, CardHeader, Alert, Spinner } from 'reactstrap';
import { createInternalTransferAccounts } from '../../../rtk/slices/InternalTransferSlice/InternalTransferAccounts';
import { createInternalTransfer, resetTransferState } from '../../../rtk/slices/InternalTransferSlice/createInternalTransfer';
import { useTranslation } from 'react-i18next';
const TransferForm = () => {
    const { t } = useTranslation(); // Initialize translation function
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { fromAccounts, toAccounts } = useSelector((state) => state.internalTransferAccounts);
    const { loading, error, success } = useSelector((state) => state.internalTransfer);

    useEffect(() => {
        dispatch(createInternalTransferAccounts());
    }, [dispatch]);

    // Validation Schema using Yup
    const validationSchema = Yup.object().shape({
        fromAccount: Yup.string()
            .required('From Account is required')
            .test("balanceCheck", "Selected account has no Balance.", function (value) {
                const selectedAccount = fromAccounts.find((account) => account.id === parseInt(value));
                return selectedAccount ? selectedAccount.balance > 0 : false;
            }),
        toAccount: Yup.string().required('To Account is required'),
        amount: Yup.number()
            .typeError('Amount must be a number')
            .required('Amount is required')
            .min(1, 'Amount must be greater than 0')
            .test('max-balance', 'Amount cannot exceed From Account balance', function (value) {
                const selectedAccount = fromAccounts.find(
                    (account) => account.id === parseInt(this.parent.fromAccount)
                );
                return selectedAccount ? value <= selectedAccount.balance : false;
            }),
    });

    const formik = useFormik({
        initialValues: {
            fromAccount: '',
            toAccount: '',
            amount: '',
        },
        validationSchema,
        enableReinitialize: true, // Ensure form updates if accounts change
        onSubmit: (values) => {
            const token = localStorage.getItem('token');


            const transferData = new FormData();

            // Find selected fromAccount
            const selectedFromAccount = fromAccounts.find(account => account.id === Number(values.fromAccount));

            if (selectedFromAccount?.account === "wallet") {
                transferData.append('from', 'wallet');
                transferData.append('wallet_id', Number(selectedFromAccount.id)); // Ensure ID is a number
            } else {
                transferData.append('from', Number(values.fromAccount)); // Convert fromAccount to number
            }

            transferData.append('to', Number(values.toAccount)); // Convert toAccount to number
            transferData.append('amount', Number(values.amount)); // Ensure amount is a number

            dispatch(createInternalTransfer({ transferData, token }));
            setTimeout(() => {
                if (window.innerWidth < 768) {
                    navigate('/transactions');  // Navigate to /transactions for smaller screens
                } else {
                    navigate('/internal-transfer');  // Default navigation for larger screens
                }
            }, 3000);
        }

    });

    return (
        <div className='page-content mt-md-5'>
            <div className='container-fluid'>
                <Card>
                    <CardHeader>
                        <h3 className="mb-0">{t('Transfer Funds')}</h3>
                    </CardHeader>
                    <CardBody>
                        {success && <Alert color="success">{t('Transfer Successful!')}</Alert>}
                        {error && <Alert color="danger">{typeof error === 'string' ? error : JSON.stringify(error)}</Alert>}
                        <form onSubmit={formik.handleSubmit}>
                            <FormGroup>
                                <Label for="fromAccount">{t('From')}</Label>
                                <Input
                                    type="select"
                                    name="fromAccount"
                                    id="fromAccount"
                                    onChange={formik.handleChange}
                                    value={formik.values.fromAccount}
                                >
                                    <option value="">{t('Select an account')}</option>
                                    {fromAccounts?.map((account) => (
                                        <option key={account.id} value={account.id}>
                                            {account.name} - (Balance: {Number(account.balance).toFixed(2)})
                                        </option>
                                    ))}
                                </Input>
                                {formik.touched.fromAccount && formik.errors.fromAccount && (
                                    <div className="text-danger">{formik.errors.fromAccount}</div>
                                )}
                            </FormGroup>

                            <FormGroup>
                                <Label for="toAccount">{t('To')}</Label>
                                <Input
                                    type="select"
                                    name="toAccount"
                                    id="toAccount"
                                    onChange={formik.handleChange}
                                    value={formik.values.toAccount}
                                >
                                    <option value="">{t('Select an account')}</option>
                                    {toAccounts?.map((account) => (
                                        <option key={account.id} value={account.id}>
                                            {account.name} - (Balance: {Number(account.balance).toFixed(2)})
                                        </option>
                                    ))}
                                </Input>
                                {formik.touched.toAccount && formik.errors.toAccount && (
                                    <div className="text-danger">{formik.errors.toAccount}</div>
                                )}
                            </FormGroup>

                            <FormGroup>
                                <Label for="amount">{t('Amount')}</Label>
                                <Input
                                    type="number"
                                    name="amount"
                                    id="amount"
                                    placeholder={t('Enter amount')}
                                    onChange={formik.handleChange}
                                    value={formik.values.amount}
                                />
                                {formik.touched.amount && formik.errors.amount && (
                                    <div className="text-danger">{formik.errors.amount}</div>
                                )}
                            </FormGroup>

                            <Button className='depositButton' block type="submit" disabled={loading}>
                                {loading ? <Spinner size="sm" /> : t('Transfer')}
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default TransferForm;

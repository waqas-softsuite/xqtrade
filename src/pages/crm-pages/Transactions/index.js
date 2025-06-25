import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Container, Spinner, Alert, ListGroup, ListGroupItem } from 'reactstrap'
import { fetchTransactionsHistory } from '../../../rtk/slices/transactionsListSlice/transactionsListSlice';
import { useTranslation } from 'react-i18next';

const Index = () => {

    const dispatch = useDispatch();
    const { transactionsList, loading, error } = useSelector((state) => state.transactionsHistory);
    const { t } = useTranslation()

    useEffect(() => {
        const token = localStorage.getItem("token"); // Get token from storage

        if (token) {
            dispatch(fetchTransactionsHistory({ token }));
        }
    }, [dispatch]);

    useEffect(() => {
        let topbar = document.getElementById('page-topbar')
        topbar.style.marginTop = "0px"
    }, [])

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <h3 className="mb-0 text-white">{t("Transactions")}</h3>

                    {loading && (
                        <div className="text-center">
                            <Spinner color="secondary" size="lg" />
                            <p className="mt-2 text-white">{t("Loading transactions...")}</p>
                        </div>
                    )}

                    {error && <Alert color="danger">{error}</Alert>}

                    {!loading && transactionsList.length === 0 && (
                        <Alert color="secondary">{t("No transactions found.")}</Alert>
                    )}

                    {!loading && transactionsList.length > 0 && (
                        <ListGroup className='mt-4'>
                            {transactionsList.map((transaction) => (
                                <ListGroupItem key={transaction.id} className="mb-2 d-flex justify-content-between align-items-center bg-dark text-white"
                                    style={{ borderRadius: '8px' }}
                                >
                                    <div>
                                        <h6 className="mb-1">{transaction.details}</h6>
                                        <small className="text-muted">{new Date(transaction.created_at).toLocaleString()}</small>
                                    </div>
                                    <div>
                                        <p>
                                            <span
                                                className={`badge bg-secondary`}
                                                style={{
                                                    color: "black"
                                                }}
                                            >
                                                {transaction.trx_type === "+" ? "+" : "-"}
                                            </span>
                                            <strong className="ms-3">${Number(transaction.amount).toFixed(2)}</strong>
                                        </p>
                                        <strong className='text-secondary'>#{transaction.trx}</strong>
                                    </div>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    )}
                </Container>
            </div>

        </>
    )
}

export default Index

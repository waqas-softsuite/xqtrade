import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, Col, Container, Row, Tooltip } from 'reactstrap';
import DepositeForm from './DepositeForm';
import MultiStepForm from './MultiStepForm';
import { useTranslation } from 'react-i18next';
const Index = () => {
    const navigate = useNavigate()
    const { t } = useTranslation();
    const [tooltipOpen, setTooltipOpen] = useState(false);

    // Toggle tooltip visibility
    const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

    const handleDepositeHistory = ()=>{
        navigate('/deposit/history')
    }

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Card className='bg-transparent'>
                        <CardHeader className='bg-transparent p-0 pb-2 mb-2'>
                            <Row noGutters className="flex-nowrap align-items-center">
                                <Col xs={6}>
                                    <h3 className="mb-0 fs-5">
                                        {t('Deposit Funds')}
                                        <span id="deposit-icon" className="ms-2">
                                            <i className="ri-questionnaire-fill"></i>
                                        </span>
                                    </h3>
                                    <Tooltip
                                        placement="top"
                                        isOpen={tooltipOpen}
                                        target="deposit-icon"
                                        toggle={toggleTooltip}
                                    >
                                        {t("Add funds using our system's gateway. The deposited amount will be credited to the account balance.")}
                                    </Tooltip>
                                </Col>
                                <Col xs={6} className='mb-0 d-flex justify-content-end'>
                                    <Button className='text-uppercase actionButtonLite' onClick={handleDepositeHistory} >{t('deposit history')}</Button>

                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody className='p-0'>
                            {/* <DepositeForm/> */}
                            <MultiStepForm/>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </>
    );
};

export default Index;

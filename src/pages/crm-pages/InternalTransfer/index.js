import React from 'react';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';
import TransactionTable from './TransactionTable';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const Index = () => {
    const navigate = useNavigate();
    const { t } = useTranslation(); // Initialize translation function
    const handleButtonClick = () => {
        navigate('/internal-transfer/create');
    };

    return (
        <div className='page-content'>
            <div className='container-fluid'>
                <Card>
                    <CardHeader>
                        <Button
                            color='primary'
                            className='text-capitalize btn-soft-primary'
                            onClick={handleButtonClick}
                        >
                            {t('New Transfer')}
                        </Button>
                    </CardHeader>
                    <CardBody>
                        <TransactionTable />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default Index;

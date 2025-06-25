import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';
import AccountDetailsTable from './AccountDetailsTable';

const Index = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleButtonClick = () => {
        navigate('/new-trading-account'); // Navigate to the specified route
    };

    return (
        <>
            <div className='page-content'>
                <div className='container-fluid'>
                    <Card className='bg-transparent'>
                        <CardHeader className='bg-transparent'>
                            <Button
                                className='text-capitalize actionButtonLite'
                                onClick={handleButtonClick} // Attach the click handler
                            >
                                Open New Real Account
                            </Button>
                        </CardHeader>
                        <CardBody>
                            <AccountDetailsTable />
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Index;

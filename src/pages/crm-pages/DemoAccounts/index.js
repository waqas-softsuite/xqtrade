import React from 'react'
import { Container, Button, Card, CardBody, CardHeader } from 'reactstrap'
import DemoAccountTable from './DemoAccountTable'
import { useNavigate } from 'react-router-dom'

const Index = () => {
    const navigate = useNavigate()
    const createDemoAccount=()=>{
        navigate('/demo-acounts/create')
    }

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Card>
                        <CardHeader>
                            <Button color='primary' className='text-uppercase btn-soft-primary' onClick={createDemoAccount}>open demo account</Button>
                        </CardHeader>
                        <CardBody>
                            <DemoAccountTable/>
                        </CardBody>
                    </Card>
                </Container>
            </div>


        </>
    )
}

export default Index

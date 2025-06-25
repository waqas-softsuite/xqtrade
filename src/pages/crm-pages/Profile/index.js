import React from 'react'
import { Card, CardBody, CardHeader, Container } from 'reactstrap'
import ProfileUpdateForm from './ProfileUpdateForm'
import GetProfile from './GetProfile'
import { useTranslation } from 'react-i18next'

const Index = () => {
    const {t} = useTranslation()
    return (
        <>
            <div className="page-content">
                <Container fluid>
                    {/* <GetProfile /> */}
                   <Card className="shadow-lg border rounded bg-transparent">
                        <CardHeader className='bg-transparent'>
                            <h3 className="mb-0">{t("Personal Information")}</h3>
                        </CardHeader>
                        <CardBody>
                            <ProfileUpdateForm />
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </>
    )
}

export default Index

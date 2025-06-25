import React, { useState } from 'react';
import { Button, Container, Row, Col, Alert } from 'reactstrap';

export function PinPad({ onPinSubmit, error }) {
    const [pin, setPin] = useState('');

    const handleNumberClick = (number) => {
        if (pin.length < 4) {
            setPin((prev) => prev + number);
        }
    };

    const handleDelete = () => {
        setPin((prev) => prev.slice(0, -1));
    };

    const handleSubmit = () => {
        if (pin.length === 4) {
            onPinSubmit(pin);
            setPin('');
        }
    };

    return (
        <div className="page-content pb-5">
            <Container className="text-center" style={{ maxWidth: '300px' }}>
                <Row className="mb-3 justify-content-center">
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: pin[i] ? '#007bff' : '#ccc',
                                margin: '0 5px',
                            }}
                        />
                    ))}
                </Row>
                {error && <Alert color="danger" className="text-center">{error}</Alert>}
                <Row className="mb-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                        <Col xs={4} key={number} className="mb-2">
                            <Button color="light" onClick={() => handleNumberClick(number)} block>
                                {number}
                            </Button>
                        </Col>
                    ))}
                    <Col xs={4} className="mb-2">
                        <Button color="light" onClick={handleDelete} block>
                        <i class="ri-close-fill"></i>
                        </Button>
                    </Col>
                    <Col xs={4} className="mb-2">
                        <Button color="light" onClick={() => handleNumberClick(0)} block>
                            0
                        </Button>
                    </Col>
                    <Col xs={4} className="mb-2">
                        <Button color="primary" onClick={handleSubmit} block>
                            →
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

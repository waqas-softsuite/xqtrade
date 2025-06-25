import React, { useState } from 'react';
import { Button, Card, CardBody, Container, FormGroup, Input, Alert } from 'reactstrap';
import { PinPad } from './PinPad';
import { useDispatch, useSelector } from 'react-redux';
import { lockApp, setPin, toggleLock } from '../../../rtk/slices/pinLockSlice/pinLockSlice';
import { useTranslation } from 'react-i18next';

export function CreatePin() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isLockEnabled } = useSelector((state) => state.pinLock);
  const [showPinSetup, setShowPinSetup] = useState(false);

  // Alert state
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
const handlePinSubmit = (newPin) => {
  const isUpdating = isLockEnabled;

  dispatch(setPin(newPin));
  setShowPinSetup(false);

  const message = isUpdating ? t('PIN updated successfully') : t('PIN created successfully');
  setAlertMessage(message);
  setAlertVisible(true);

  // Delay locking (or enabling lock) so alert can show first
  setTimeout(() => {
    setAlertVisible(false);

    if (isUpdating) {
      dispatch(lockApp()); // Force lock again
    } else {
      dispatch(toggleLock(true)); // First-time setup
    }
  }, 1500); // Delay must match Alert's display duration
};



  return (
    <div className="page-content pb-5">
       {alertVisible && (
        <Alert
          color="success"
          fade={true}
          className="position-fixed top-1 end-0 translate-middle-x mt-3 w-25"
          toggle={() => setAlertVisible(false)}
        >
          {alertMessage}
        </Alert>
      )}
      <Container className="mt-4 pt-5" style={{ maxWidth: '400px' }}>
       
        <h1 className="text-center mb-4 mt-4">{t('App Lock')}</h1>

        <Card className="mb-4">
          <CardBody>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                {isLockEnabled ? (
                  <i className="ri-lock-fill me-2" style={{ fontSize: "20px" }}></i>
                ) : (
                  <i className="ri-lock-unlock-fill me-2" style={{ fontSize: "20px" }}></i>
                )}
                <span className="fw-medium">{t('App Lock')}</span>
              </div>
              <FormGroup switch>
                <Input
                  type="switch"
                  checked={isLockEnabled}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setShowPinSetup(true);
                    } else {
                      dispatch(toggleLock(false));
                    }
                  }}
                />
              </FormGroup>
            </div>
          </CardBody>
        </Card>

        {showPinSetup && (
          <div className="text-center mt-4">
            <h2 className="mb-3">{t('Set Your PIN')}</h2>
            <PinPad onPinSubmit={handlePinSubmit} />
          </div>
        )}

        {isLockEnabled && !showPinSetup && (
          <div className="mt-4">
            <Button color="secondary" block onClick={() => setShowPinSetup(true)}>
              {t('Change PIN')}
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}

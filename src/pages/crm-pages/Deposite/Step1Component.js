import React from "react";
import { Field, ErrorMessage } from "formik";
import { Form, FormGroup, Label, Input, Row, Col, Alert } from "reactstrap";
import Select from "react-select";
import { useTranslation } from "react-i18next";

const Step1Component = ({ gateways, tradeAccounts, handlegatewaysChange, handleAccountChange, handleAmountChange, amount }) => {


  
  const gatewayOptions = gateways.map((method) => ({
    id: method.id, 
    value: method.method_code,
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={`https://wise.com/public-resources/assets/flags/rectangle/${String(
            method.currency
          )
            .slice(0, 3)
            .toLowerCase()}.png`}
          alt={method.currency}
          width="20"
          style={{ marginRight: "10px" }}
        />
        {method.name}
      </div>
    ),
    id: method.id, // Store the unique id in the option
    currency: method.currency, // Optional: Store currency to make the label unique
  }));

  const { t } = useTranslation();
  return (
    <Form>
      {/* Withdraw Method Field */}
      <FormGroup>
        <Select
          options={gatewayOptions}
          onChange={(selectedOption) => {
            if (!selectedOption || !selectedOption.value) {
              console.error("Invalid selection:");
              return;
            }

            if (typeof handlegatewaysChange === "function") {
              handlegatewaysChange(selectedOption); // Ensure it gets the correct value
            } else {
              console.error("handlegatewaysChange is not a function:");
            }
          }}
          placeholder={t('Select Gateway')}
          name="gateway"
        />



        <ErrorMessage name="gateway" component="div" className="text-danger" />
      </FormGroup>

      {/* Account Selection Field */}
      <FormGroup>
        {/* <Label for="account">Select Account</Label> */}
        <Field
          as={Input}
          type="select"
          name="account"
          onChange={handleAccountChange}
          invalid={!!ErrorMessage && ErrorMessage.name === "account"}
        >
          <option value="">{t('Select Account')}</option>
          {tradeAccounts && tradeAccounts.length > 0 ? (
            tradeAccounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name} ({Number(account.balance).toFixed(2)})
              </option>
            ))
          ) : (
            <option value="">{t('No accounts available')}</option>
          )}
        </Field>
        <ErrorMessage name="account" component="div" className="text-danger" />
      </FormGroup>

      {/* Amount Field */}
      <FormGroup>
        {/* <Label for="amount">Amount</Label> */}
        <Field
          type="number"
          name="amount"
          value={amount}
          onChange={handleAmountChange}
          className="form-control"
          placeholder={t("Amount")}
        />
        <ErrorMessage name="amount" component="div" className="text-danger" />
      </FormGroup>

      {/* Conversion Rate and Receivable Calculation */}
      {/* {gateway === "Bank Transfer" && amount > 0 && (
        <Row>
          <Col>
            <Alert color="info">
              <div>Conversion Rate: 1 USD = {conversionRate} INR</div>
              <div>Receivable: {amount * conversionRate} INR</div>
            </Alert>
          </Col>
        </Row>
      )} */}
    </Form>
  );
};

export default Step1Component;

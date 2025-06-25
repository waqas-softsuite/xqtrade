import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { Form, FormGroup, Input, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

const Step1Component = ({
  withdrawMethods,
  tradeAccounts,
  walletList,
  handleWalletMethodChange,
  handleWithdrawMethodChange,
  handleAccountChange,
  handleAmountChange,
  amount,
  activeTab,
  setActiveTab
}) => {


  const {t} = useTranslation()

  return (
    <Form>
      {/* Tabs for switching between Trade Account and Wallet */}
      <Nav tabs className="mb-2 custom-tabs">
        <NavItem className="flex-grow-1 text-center">
          <NavLink
            className={classnames("custom-tab", { active: activeTab === "trade_account" })}
            onClick={() => setActiveTab("trade_account")}
          >
            {t("Trade Account")}
          </NavLink>
        </NavItem>
        <NavItem className="flex-grow-1 text-center">
          <NavLink
            className={classnames("custom-tab", { active: activeTab === "wallet" })}
            onClick={() => setActiveTab("wallet")}
          >
            {t("Wallet")}
          </NavLink>
        </NavItem>
      </Nav>


      <TabContent activeTab={activeTab}>
        <TabPane tabId="trade_account">
          {/* Account Selection Field (Shown only in Trade Account tab) */}
          <FormGroup>
            <Field
              as={Input}
              type="select"
              name="account"
              onChange={handleAccountChange}
              style={{paddingVertical: "12px,"}}
            >
              <option value="">{t("Select Account")}</option>
              {tradeAccounts?.length > 0 ? (
                tradeAccounts.map((account) => (
                  <option key={account.id} value={account.id} style={{fontSize:"15px", }}>
                    {account.name} ({Number(account.balance).toFixed(2)})
                  </option>
                ))
              ) : (
                <option value="">{t("No accounts available")}</option>
              )}
            </Field>
            <ErrorMessage name="account" component="div" className="text-danger" />
          </FormGroup>
        </TabPane>

        <TabPane tabId="wallet">
          {/* Wallet Selection Field (Shown only in Wallet tab) */}
          <FormGroup>
            <Field
              as={Input}
              type="select"
              name="wallet"
              onChange={handleWalletMethodChange}
            >
              <option value="">{t("Select Wallet")}</option>
              {walletList?.length > 0 ? (
                walletList.map((wallet) => (
                  <option key={wallet.id} value={wallet.id}>
                    {wallet.currency} ({Number(wallet.balance).toFixed(2)})
                  </option>
                ))
              ) : (
                <option value="">{t("No wallets available")}</option>
              )}
            </Field>
            <ErrorMessage name="wallet" component="div" className="text-danger" />
          </FormGroup>
        </TabPane>
      </TabContent>

      {/* Withdraw Method Field */}
      <FormGroup>
        <Field
          as={Input}
          type="select"
          name="withdrawMethod"
          onChange={handleWithdrawMethodChange}
          invalid={!!ErrorMessage && ErrorMessage.name === "withdrawMethod"}
        >
          <option value="">{t("Withdrawal Method")}</option>
          {withdrawMethods.map((method) => (
            <option key={method.id} value={method.id}>
              {method.name}
            </option>
          ))}
        </Field>
        <ErrorMessage name="withdrawMethod" component="div" className="text-danger" />
      </FormGroup>

      {/* Amount Field */}
      <FormGroup>
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
    </Form>
  );
};

export default Step1Component;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { useTranslation } from 'react-i18next';


const PaymentsPanel = ({ isOpen, toggle }) => {


   const { t } = useTranslation();

  const navigate = useNavigate()
  return (
    <div className="profileSidebar" style={{ ...styles.panel, transform: isOpen ? "translateX(0)" : "translateX(100%)",overflow:'auto' }}>
      {/* Header */}
      <div style={styles.header}>
        <h5 style={styles.title}>{t('Payments')}</h5>
        <button style={styles.closeBtn} onClick={toggle}>✕</button>
      </div>

      {/* Payment Buttons */}
      <div style={styles.buttonGroup}>
        <Button style={styles.depositButton} onClick={() => {
          navigate('/deposit')
          toggle()
        }}>
          <i className="ri-wallet-fill text-white" style={styles.icon}></i> {t('Deposit')}
        </Button>
        <Button style={styles.actionButton} onClick={() => {
          navigate('/withdraw-funds')
          toggle()
        }}>
          <i className="ri-upload-2-line" style={styles.icon}></i> {t('Withdraw')}
        </Button>
        <Button style={styles.actionButton} onClick={() => {
          navigate('/internal-transfer/create')
          toggle()

        }}>

          <i className="ri-arrow-left-right-line" style={styles.icon}></i> {t('Transfer')}
        </Button>
        <Button style={styles.actionButton} onClick={() => {
          navigate('/transactions')
          toggle()
        }}>
          <i className="ri-time-line" style={styles.icon} ></i> {t('Transactions')}
        </Button>
        <Button style={styles.actionButton} onClick={() => {
          navigate('/wallets')
          toggle()
        }}>
          <i class="ri-hand-coin-fill" style={styles.icon} ></i> {t('Affiliate Comission')}
        </Button>
      </div>
    </div>
  );
};

const styles = {
  panel: {
    position: "fixed",
    top: "0",
    right: "0",
    width: "100%",
    maxWidth: "100%",
    height: "100vh",
    background: "#010e1c",
    padding: "20px",
    transition: "transform 0.3s ease-in-out",
    zIndex: 99999,
    boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.5)",
    scrollbarWidth: "none"

  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#fff",
    marginBottom: "20px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "20px",
    cursor: "pointer",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  depositButton: {
    // background: "linear-gradient(90deg, rgba(1, 254, 239, 1) 0%, rgba(45, 254, 77, 1) 100%)",
    background:"#1e90ff",
    color: "#ffffff",
    fontSize: "16px",
    padding: "12px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "10px",
    border: "none",
  },
  actionButton: {
    background: "#1e90ff",
    color: "#fff",
    fontSize: "16px",
    padding: "12px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "10px",
    border: "none",
  },
  icon: {
    fontSize: "20px",
  },
};

export default PaymentsPanel;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ListGroup, ListGroupItem, Spinner, Row, Col, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { setSelectedAccount, toggleModal, setTradeAccounts } from '../rtk/slices/accountTypeSlice/accountTypeSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import RenameAccountModal from '../pages/DashboardCrypto/MarketGraph/RenameAccountModal';
const AccountTypeModel = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isModalOpen, selectedAccount, tradeAccounts } = useSelector((state) => state.accountType);
    const { tradeAccount, status } = useSelector((state) => state.tradeAccountsList) || {};
    const appSettings = JSON.parse(localStorage.getItem('appSettings')) || {};
    const isHiddenBalance = appSettings.hiddenBalances ?? false;

    let tradeAccoutsArray = []
    const tradeAccountsData = tradeAccount?.data || [];

    const loginTradeAcconts = useSelector((state) => state.auth.tradeAccounts)

    tradeAccoutsArray = tradeAccountsData?.length > 0 ? tradeAccountsData : loginTradeAcconts;
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [isRenameModalOpen, setRenameModalOpen] = useState(false);
    const [selectedRenameAccount, setSelectedRenameAccount] = useState(null);


    const toggleDropdown = (accountId) => {
        setDropdownOpen(dropdownOpen === accountId ? null : accountId);
    };

    useEffect(() => {
        const storedAccount = localStorage.getItem("selectedAccount");
        if (storedAccount) {
            dispatch(setSelectedAccount(JSON.parse(storedAccount)));
        }
    }, [dispatch]);

    // Fetch trade accounts and store them in Redux
    useEffect(() => {
        if (tradeAccoutsArray?.length > 0) {
            dispatch(setTradeAccounts(tradeAccoutsArray));

            // If no selected account is found in localStorage, set the first account by default
            const storedAccount = localStorage.getItem("selectedAccount");
            if (!storedAccount) {
                dispatch(setSelectedAccount(tradeAccoutsArray[0]));
                localStorage.setItem("selectedAccount", JSON.stringify(tradeAccoutsArray[0]));
            }
        }
    }, [tradeAccoutsArray, dispatch]);

    const handleAccountSelect = (account) => {
        dispatch(setSelectedAccount(account));
        localStorage.setItem("selectedAccount", JSON.stringify(account)); // Store in localStorage
        // dispatch(toggleModal());
    };

    useEffect(() => {
        if (selectedAccount) {
            localStorage.setItem("selectedAccount", JSON.stringify(selectedAccount));
        }
    }, [selectedAccount]);

    return (
        <>
            <Modal isOpen={isModalOpen} toggle={() => dispatch(toggleModal())} className="modal-accountType-bottom" >

                <ModalHeader className="text-center">{t('Accounts')}</ModalHeader>
                <ModalBody>
                    <ListGroup>
                        {status === 'loading' ? (
                            <ListGroupItem className="text-center">
                                <Spinner size="sm" color="primary" /> {t('Loading')}...
                            </ListGroupItem>
                        ) : tradeAccounts?.length > 0 ? (
                            tradeAccounts.map((account) => (
                                <ListGroupItem
                                    key={account.id}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleAccountSelect(account)
                                    }}
                                    // onClick={() => handleAccountSelect(account)}
                                    action
                                    style={{
                                        backgroundColor: selectedAccount?.id === account.id ? "rgba(242, 242, 242, 0.13)" : "#010E1C",
                                        borderRadius: selectedAccount?.id === account.id ? "8px" : ""
                                    }}
                                    className='border-0'

                                >
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div >
                                            <span>{account.name}</span>
                                            <br />
                                            {!isHiddenBalance ? (
                                                <span>{account.trade_group_detail?.name} - {Number(account.balance).toFixed(2) ?? "0"}</span>
                                            ) : (
                                                <span>****</span> // Hide balance when hiddenBalances is active
                                            )}

                                        </div>
                                        <Dropdown isOpen={dropdownOpen === account.id} toggle={() => toggleDropdown(account.id)}>
                                            <DropdownToggle
                                                tag="i"
                                                className="ri-more-2-fill fs-4"
                                                style={{ cursor: "pointer" }}
                                                onClick={(e) => e.stopPropagation()} // Prevent event bubbling
                                            ></DropdownToggle>
                                            <DropdownMenu dark end>
                                                <DropdownItem onClick={() => {
                                                    navigate('/deposit')
                                                    dispatch(toggleModal())
                                                }}>
                                                    <i className="ri-upload-fill me-2" ></i>{t('Deposit')}
                                                </DropdownItem>
                                                <DropdownItem onClick={() => {
                                                    navigate('/withdraw-funds')
                                                    dispatch(toggleModal())
                                                }}>
                                                    <i className="ri-download-fill me-2"></i>{t('Withdraw')}
                                                </DropdownItem>
                                                <DropdownItem><i className="ri-exchange-line me-2"></i>{t('Transfer')}</DropdownItem>
                                                <DropdownItem onClick={() => {
                                                    navigate('/transactions')
                                                    dispatch(toggleModal())
                                                }}><i className="ri-file-list-2-fill me-2"></i>{t('Transactions')}</DropdownItem>
                                                <DropdownItem
                                                    onClick={() => {
                                                        setSelectedRenameAccount(account);
                                                        setRenameModalOpen(true);
                                                        dispatch(toggleModal())
                                                    }}
                                                ><i className="ri-edit-2-fill me-2"></i>{t('Rename')}</DropdownItem>
                                                {/* <DropdownItem><i className="ri-archive-fill me-2"></i>{t('Archive')}</DropdownItem> */}
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>

                                    {selectedAccount?.id === account.id && (
                                        <Row className='mt-2'>
                                            <Col xs={6}>
                                                <Button block style={styles.actionButton} onClick={() => {
                                                    navigate('/withdraw-funds')
                                                    dispatch(toggleModal())
                                                }}>
                                                    {t('Withdraw')}
                                                </Button>
                                            </Col>
                                            <Col xs={6} onClick={() => {
                                                navigate('/deposit')
                                                dispatch(toggleModal())
                                            }}>
                                                <Button block style={styles.depositButton}>
                                                    {t('Deposit')}
                                                </Button>
                                            </Col>
                                        </Row>
                                    )}
                                </ListGroupItem>
                            ))
                        ) : (
                            <ListGroupItem className="text-center">{t('No Trade Accounts Available')}</ListGroupItem>
                        )}

                        <ListGroupItem className="text-start mt-2 bg-transparent" style={{ border: "none", borderRadius: "0px", }} onClick={() => {
                            dispatch(toggleModal());
                            navigate('/new-trading-account')
                        }}>
                            <Link to="/new-trading-account"  style={{color:'#1e90ff'}}>
                                <span className='me-2'>+</span>{t('Add Account')}
                            </Link>
                        </ListGroupItem>
                    </ListGroup>
                </ModalBody>

            </Modal>
            {selectedRenameAccount && (
                <RenameAccountModal
                    isOpen={isRenameModalOpen}
                    toggle={() => setRenameModalOpen(false)}
                    account={selectedRenameAccount}
                    tradeAccounts={tradeAccounts}
                />
            )}

        </>
    );
};

export default AccountTypeModel;

const styles = {
    actionButton: {
        // background: "rgba(242, 242, 242, 0.08)",
        backgroundColor: '#1e90ff',
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
    depositButton: {
        // background: "linear-gradient(90deg, rgba(1, 254, 239, 1) 0%, rgba(45, 254, 77, 1) 100%)",
        backgroundColor: '#1e90ff',
        color: "#000",
        fontSize: "16px",
        padding: "12px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "10px",
        border: "none",
    },
}
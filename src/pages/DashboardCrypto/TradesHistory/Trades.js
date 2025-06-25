import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Accordion, AccordionBody, AccordionHeader, AccordionItem, Spinner, Alert, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import { fetchBinaryTradeHistory } from '../../../rtk/slices/binaryTradeHistorySlice/binaryTradeHistorySlice';

import { removeTrade, updateTradeTime } from '../../../rtk/slices/orderSlice/orderSlice';
import { useTranslation } from 'react-i18next';
import { cancelPendingOrder } from '../../../rtk/slices/pendingOrderSlice/cancelPendingOrderSlice';
import pusher from '../../../helpers/pusher';
import { updateBalanceFromPusher } from '../../../rtk/slices/accountTypeSlice/accountTypeSlice';
const Trades = () => {
    const storedToken = localStorage.getItem("token");
    const dispatch = useDispatch();
    const { binaryTrades, pendingTrades, loading, error } = useSelector((state) => state.binaryTradeHistory);
    const [activeTab, setActiveTab] = useState('1');
    const [open, setOpen] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { selectedAccount } = useSelector((state) => state.accountType);
    const { t } = useTranslation();

    const activeTrades = useSelector(state => state.order.activeTrades);
    const historyRefreshKey = useSelector(state => state.order.historyRefreshKey);
    const [timers, setTimers] = useState({});

    // call down, put up 

    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    const filteredTrades = binaryTrades?.filter(trade => {
        if (filterType === 'win') return trade.result === 'win' || trade.win_status === 1;
        if (filterType === 'loss') return trade.result === 'loss' || trade.win_status === 0;
        return true; // Show all trades if filterType is 'all'
    });




    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };



    const toggle = (id) => {
        setOpen(open === id ? '' : id);
    };

    // Format date to YYYY-MM-DD
    const date = new Date();
    const formatter = new Intl.DateTimeFormat('en-CA'); // 'en-CA' gives YYYY-MM-DD
    const formattedDate = formatter.format(date);

    useEffect(() => {
        const storedToken = localStorage.getItem("token"); // Fetch token from local storage

        if (storedToken) {
            dispatch(fetchBinaryTradeHistory({ startDate: formattedDate, token: storedToken }));
        }
    }, [historyRefreshKey, dispatch, formattedDate]);




    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        // Clear existing timers before creating new ones
        Object.values(timers).forEach(clearInterval);

        const newTimers = {};

        activeTrades.forEach((trade) => {
            if (trade.remainingTime > 0) {
                newTimers[trade.id] = setInterval(() => {
                    dispatch(updateTradeTime({ id: trade.id, remainingTime: trade.remainingTime - 1 }));

                    if (trade.remainingTime - 1 <= 0) {
                        dispatch(removeTrade(trade.id));
                        clearInterval(newTimers[trade.id]);
                        dispatch(fetchBinaryTradeHistory({ startDate: formattedDate, token: storedToken }));
                    }
                }, 1000);
            }
        });

        // Save new timers in state
        setTimers(newTimers);

        return () => {
            Object.values(newTimers).forEach(clearInterval);
        };
    }, [activeTrades, dispatch]);


    


    return (
        <Container>
            <h4 className="mt-3 fw-bold" style={{ fontSize: "27px" }}>{t('Trades')}</h4>
            <Nav tabs className="trade-tabs">
                <NavItem>
                    <NavLink style={{ cursor: 'pointer', fontSize: "16px", border: '0px', borderBottom: activeTab === '1' ? "1px solid #1e90ff " : "" }}
                        className={activeTab === '1' ? 'active text-secondary bg-transparent' : ''}
                        onClick={() => setActiveTab('1')}>
                        {t('XQ Trades')}
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink style={{ cursor: 'pointer', fontSize: "16px", border: '0px', borderBottom: activeTab === '2' ? "1px solid #1e90ff " : "" }}
                        className={activeTab === '2' ? 'active text-secondary bg-transparent' : ''} onClick={() => {
                            setActiveTab('2')
                            const storedToken = localStorage.getItem("token");
                            dispatch(fetchBinaryTradeHistory({ startDate: formattedDate, token: storedToken }));
                        }}>
                        {t('History')}
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink style={{ cursor: 'pointer', fontSize: "16px", border: '0px', borderBottom: activeTab === '3' ? "1px solid #1e90ff " : "" }}
                        className={activeTab === '3' ? 'active text-secondary bg-transparent' : ''} onClick={() => {
                            setActiveTab('3')
                            const storedToken = localStorage.getItem("token");
                            dispatch(fetchBinaryTradeHistory({ startDate: formattedDate, token: storedToken }));
                        }}>
                        {t('Pending')}
                    </NavLink>
                </NavItem>
            </Nav>

            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <h5 className="mt-3 fw-bold" style={{ fontSize: "21px" }}>{t('Active Trades')}</h5>


                    <div className="no-trades text-center">
                        {activeTrades.length === 0 ? (
                            <>
                                <i className="ri-refresh-line big-icon" style={{ fontSize: "42px" }}></i>
                                <p className='text text-light fw-bold' style={{ fontSize: "16px" }}>{t('You have no open trades on this account')}</p>
                            </>
                        ) : (
                            activeTrades.map(trade => (
                                <>
                                    {/* <div key={trade.id} className="trade">
                                        <span>{trade.type} - {trade.price}</span>
                                        <span>Time Left: {trade.remainingTime}s</span>
                                        <button onClick={() => dispatch(removeTrade(trade.id))}>Close</button>
                                    </div> */}

                                    <div className="cb d-flex justify-content-between align-items-center">
                                        <div className='d-flex'>
                                            <i className="ri-bit-coin-fill text-warning trade-icon"></i>
                                            <p className='mb-0'>
                                                <span className="ms-2">{trade.symbol} <br /> </span>
                                                <small className="ms-2">{trade.type || "--"}</small> <br />
                                                <div className="small ms-2" ><i className="ri-history-line"></i> {formatTime(trade.remainingTime)}</div>
                                            </p>
                                        </div>
                                        <div className="text-end">
                                            <div className="text-danger"><i className="ri-arrow-down-s-line"></i> {Number(trade.amount)}</div>
                                            <div className="text-danger">{trade.price}</div>
                                        </div>
                                    </div>
                                </>

                            ))
                        )}
                    </div>


                </TabPane>
                <TabPane tabId="2">
                    {loading && (
                        <div className="text-center my-3">
                            <Spinner color="primary" />
                        </div>
                    )}
                    {error && <Alert color="danger">Error: {error}</Alert>}
                    {!loading && !error && (
                        <>



                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="mt-3 fw-bold" style={{ fontSize: "21px" }}>{t("History")}</h5>

                                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                                    <DropdownToggle tag="span" data-toggle="dropdown" aria-expanded={dropdownOpen} style={{ cursor: 'pointer' }}>
                                        <i className="ri-more-2-fill" style={{ fontSize: '24px' }}></i>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => setFilterType('all')}>{t("All Trades")}</DropdownItem>
                                        <DropdownItem onClick={() => setFilterType('win')}>{t("Winning Trades")}</DropdownItem>
                                        <DropdownItem onClick={() => setFilterType('loss')}>{t("Losing Trades")}</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                            {/*  */}
                            <Row>
                                <Col xs="12" className="p-0">
                                    <Accordion open={open} toggle={toggle} style={{ marginBottom: "70px" }}>
                                        {filteredTrades?.map((trade) => (
                                            <AccordionItem className='mb-2 fw-bold' key={trade.id}>
                                                <AccordionHeader className="trade-card w-100 fw-bold" targetId={String(trade.id)}>
                                                    <div className="cb d-flex justify-content-between align-items-center">
                                                        <div className='d-flex'>
                                                            <img src="https://cfcdn.olymptrade.com/assets1/instrument/vector/ASIA.c98e6b5283b2504d839b790a34a65587.svg" data-test="pair-name-ASIA_X" class="sc-gGuRsA cCVlOR" />
                                                            <p className='mb-0 fw-bold'>
                                                                <span className="ms-2 fw-bold">{trade.symbol} {trade.accountType ? `- ${trade.accountType}` : ""} <br /> </span>
                                                                <small className="ms-2 fw-bold">{trade.percent || "--"}</small> <br />
                                                                <div className="largeFontSize ms-2 fw-bold" ><i className="ri-history-line"></i> {trade.duration}</div>
                                                            </p>

                                                        </div>
                                                        <div className="text-end">
                                                            <div className=" fw-bold" style={{ color: '#778383', fontSize: "12px" }}>

                                                                <i className={trade.direction === "call" ? "ri-arrow-down-fill text-danger" : "ri-arrow-up-fill text-secondary"}></i>

                                                                {Number(trade.amount)}</div>
                                                            <div style={{
                                                                fontSize: "14px", fontWeight: "500",
                                                                color: trade.result === "win" ? "#1e90ff" : "red", marginTop: "5px"
                                                            }}>
                                                                {trade.profit >= 0 ? `+${trade.profit}` : `-${Math.abs(trade.profit)}`}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </AccordionHeader>
                                                <AccordionBody accordionId={String(trade.id)}>
                                                    <div className="d-flex flex-column gap-3">
                                                        <div>
                                                            <div className="d-flex w-100 justify-content-start">
                                                                <p className="fw-bold">{t("Income")}</p>
                                                                <div className="PBFrHEcSzm"></div>
                                                                <p className="fw-bold">{Number(trade.profit).toFixed(2)}</p>
                                                            </div>
                                                            {/* <div className="d-flex w-100 justify-content-start">
                                                                <p className="fw-bold">Closed</p>
                                                                <div className="PBFrHEcSzm"></div>
                                                                <p className="fw-bold"> early</p>
                                                            </div>*/}
                                                        </div>
                                                        <div>
                                                            <div className="d-flex w-100 justify-content-start">
                                                                <p className="fw-bold">{t("Duration")}</p>
                                                                <div className="PBFrHEcSzm"></div>
                                                                <p className="fw-bold">{trade.duration} sec</p>
                                                            </div>
                                                            <div className="d-flex w-100 justify-content-start">
                                                                <p className="fw-bold">{t("Amount")}</p>
                                                                <div className="PBFrHEcSzm"></div>
                                                                <p className="fw-bold">{Number(trade.amount).toFixed(2)}</p>
                                                            </div>
                                                             <div className="d-flex w-100 justify-content-start">
                                                                <p className="fw-bold">{t("Opening quote")}</p>
                                                                <div className="PBFrHEcSzm"></div>
                                                                <p className="fw-bold">{Number(trade.last_price).toFixed(2)}</p>
                                                            </div>
                                                            <div className="d-flex w-100 justify-content-start">
                                                                <p className="fw-bold">{t("Closing quote")}</p>
                                                                <div className="PBFrHEcSzm"></div>
                                                                <p className="fw-bold">{Number(trade.result_price).toFixed(2)}</p>
                                                            </div>
                                                            {/* <div className="d-flex w-100 justify-content-start">
                                                                <p className="fw-bold">Result</p>
                                                                <div className="PBFrHEcSzm"></div>
                                                                <p className="fw-bold">{(trade.result)}</p>
                                                            </div> */}
                                                            <div className="d-flex w-100 justify-content-start">
                                                                <p className="fw-bold">{t("Trade ID")}</p>
                                                                <div className="PBFrHEcSzm"></div>
                                                                <p className="fw-bold">{trade.trx}</p>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="d-flex w-100 justify-content-start">
                                                                <p className="fw-bold">{t("Trade opened")}</p>
                                                                <div className="PBFrHEcSzm"></div>
                                                                <p className="fw-bold">
                                                                    {new Date(trade.created_at).toLocaleString('sv-SE', { timeZone: 'UTC' }).replace('T', ' ')}
                                                                </p>

                                                            </div>
                                                            <div className="d-flex w-100 justify-content-start">
                                                                <p className="fw-bold">{t("Trade Closed")}</p>
                                                                <div className="PBFrHEcSzm"></div>
                                                                <p className="fw-bold">{trade.trade_ended_at}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </AccordionBody>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </Col>
                            </Row>
                        </>
                    )}
                </TabPane>
                <TabPane tabId="3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mt-3 fw-bold" style={{ fontSize: "21px" }}>{t("Pending Orders")}</h5>
                    </div>
                    {/*  */}
                    <Row>
                        <Col xs="12" className="p-0">
                            <Accordion open={open} toggle={toggle} style={{ marginBottom: "70px" }}>
                                {pendingTrades?.map((trade) => (
                                    <AccordionItem className='mb-2 fw-bold' key={trade.id}>
                                        <AccordionHeader className="trade-card w-100 fw-bold" targetId={String(trade.id)}>
                                            <div className="cb d-flex justify-content-between align-items-center">
                                                <div className='d-flex'>
                                                    <img src="https://cfcdn.olymptrade.com/assets1/instrument/vector/ASIA.c98e6b5283b2504d839b790a34a65587.svg" data-test="pair-name-ASIA_X" class="sc-gGuRsA cCVlOR" />
                                                    <p className='mb-0 fw-bold'>
                                                        <span className="ms-2 fw-bold">{trade.symbol} {trade.accountType ? `- ${trade.accountType}` : ""} <br /> </span>
                                                        <small className="ms-2 fw-bold">{trade.percent || "--"}</small> <br />
                                                        <div className="ms-2 fw-bold" style={{ fontSize: '1rem' }}><i className="ri-history-line"></i> {trade.duration}</div>
                                                    </p>
                                                </div>
                                                <div className="text-end">
                                                    <div className=" fw-bold" style={{ color: '#778383', fontSize: "12px" }}>

                                                        <i className={trade.direction === "call" ? "ri-arrow-down-fill text-danger" : "ri-arrow-up-fill text-secondary"}></i>

                                                        {Number(trade.amount)}</div>
                                                    <div style={{
                                                        fontSize: "14px", fontWeight: "500",
                                                        color: trade.result === "win" ? "#1e90ff" : "red", marginTop: "5px"
                                                    }}>
                                                        {trade.profit >= 0 ? `+${trade.profit}` : `-${Math.abs(trade.profit)}`}
                                                    </div>
                                                    <Button
                                                        onClick={e => {
                                                            e.stopPropagation();
                                                            dispatch(cancelPendingOrder({ order_id: trade.id }))
                                                                .then(() => {
                                                                    const storedToken = localStorage.getItem("token");
                                                                    dispatch(fetchBinaryTradeHistory({ startDate: formattedDate, token: storedToken }));
                                                                });
                                                        }}
                                                    >
                                                        <i className="ri-delete-bin-line"></i>
                                                    </Button>

                                                </div>
                                            </div>
                                        </AccordionHeader>
                                        <AccordionBody accordionId={String(trade.id)}>
                                            <div className="d-flex flex-column gap-3">
                                                <div>
                                                    {/* <div className="d-flex w-100 justify-content-start">
                                                        <p className="fw-bold">Income</p>
                                                        <div className="PBFrHEcSzm"></div>
                                                        <p className="fw-bold">{trade.win_amount}</p>
                                                    </div> */}
                                                    <div className="d-flex w-100 justify-content-start">
                                                        <p className="fw-bold">{t("Closed")}</p>
                                                        <div className="PBFrHEcSzm"></div>
                                                        <p className="fw-bold">{t("early")}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="d-flex w-100 justify-content-start">
                                                        <p className="fw-bold">{t("Duration")}</p>
                                                        <div className="PBFrHEcSzm"></div>
                                                        <p className="fw-bold">{trade.duration} sec</p>
                                                    </div>
                                                    <div className="d-flex w-100 justify-content-start">
                                                        <p className="fw-bold">{t("Amount")}</p>
                                                        <div className="PBFrHEcSzm"></div>
                                                        <p className="fw-bold">{Number(trade.amount).toFixed(2)}</p>
                                                    </div>
                                                    {/* <div className="d-flex w-100 justify-content-start">
                                                        <p className="fw-bold">Opening quote</p>
                                                        <div className="PBFrHEcSzm"></div>
                                                        <p className="fw-bold">{Number(trade.last_price).toFixed(2)}</p>
                                                    </div>
                                                    <div className="d-flex w-100 justify-content-start">
                                                        <p className="fw-bold">Closing quote</p>
                                                        <div className="PBFrHEcSzm"></div>
                                                        <p className="fw-bold">{Number(trade.result_price).toFixed(2)}</p>
                                                    </div>
                                                    {/* <div className="d-flex w-100 justify-content-start">
                                                        <p className="fw-bold">Result</p>
                                                        <div className="PBFrHEcSzm"></div>
                                                        <p className="fw-bold">{(trade.result)}</p>
                                                    </div> */}
                                                    <div className="d-flex w-100 justify-content-start">
                                                        <p className="fw-bold">{t("Trade ID")}</p>
                                                        <div className="PBFrHEcSzm"></div>
                                                        <p className="fw-bold">{trade.trx}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="d-flex w-100 justify-content-start">
                                                        <p className="fw-bold">{t("Trade opened")}</p>
                                                        <div className="PBFrHEcSzm"></div>
                                                        <p className="fw-bold">
                                                            {new Date(trade.created_at).toLocaleString('sv-SE', { timeZone: 'UTC' }).replace('T', ' ')}
                                                        </p>

                                                    </div>
                                                    <div className="d-flex w-100 justify-content-start">
                                                        <p className="fw-bold">{t("Trade Closed")}</p>
                                                        <div className="PBFrHEcSzm"></div>
                                                        <p className="fw-bold">{trade.trade_ended_at}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </AccordionBody>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </Col>
                    </Row>
                </TabPane>

            </TabContent>
        </Container>
    );
};

export default Trades;

import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import finance from "../../assets/images/Trades.png";
import signal from "../../assets/images/Terminals.png";
import markete from "../../assets/images/Market.png";
import Achivements from "../../assets/images/Event.png";
import help from "../../assets/images/Help.png";

const TabButtonsComponent = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState(null);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const isMobile = window.innerWidth < 768;

    const toggleTab = (tab) => {
        const isMobile = window.innerWidth < 768;

        if (tab === "1") {
            navigate(`/dashboard`);
            setActiveTab("1");
        } else {
            if (activeTab !== tab) {
                setActiveTab(tab);

                if (isMobile) {
                    // Mobile behavior (use ?tab=2, etc.)
                    setSearchParams({ tab });
                    navigate(`/trade?tab=${tab}`);
                } else {
                    // Desktop behavior (use different routes)
                    let route = '';
                    switch (tab) {
                        case "2":
                            route = '/active-trades';
                            break;
                        case "3":
                            route = '/market';
                            break;
                        case "4":
                            route = '/events';
                            break;
                        case "5":
                            route = '/help';
                            break;
                        default:
                            route = '/trade';
                            break;
                    }
                    navigate(route);
                }
            }
        }
    };

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        if (!isMobile) return;

        const tabFromUrl = searchParams.get('tab');
        if (tabFromUrl && ['1', '2', '3', '4', '5'].includes(tabFromUrl)) {
            setActiveTab(tabFromUrl);
        } else {
            setActiveTab(null);
        }
    }, [searchParams]);

    useEffect(() => {
        // Get the tab from the URL search params
        const tabFromUrl = searchParams.get('tab');

        // Set the active tab if it's valid (1, 2, 3, 4, 5)
        if (tabFromUrl && ['1', '2', '3', '4', '5'].includes(tabFromUrl)) {
            setActiveTab(tabFromUrl);
        } else {
            setActiveTab(null); // If the tab is invalid or not present, reset active tab
        }
    }, [searchParams]); // Watch searchParams for changes

    const layout = useSelector(state => state.Layout);
    const layoutMode = layout?.layoutModeType;
    const bgClass = layoutMode === 'dark' ? 'bg-black' : 'bg-white';

    // Helper function to get active styles
    const getItemStyle = (tabId) => ({
        color: activeTab === tabId ? "#BE1984" : "#B8A9DC",
        textAlign: "center",
        fontSize: "10px",
        fontWeight: "600",
        letterSpacing: "0.5px",
        cursor: "pointer",
        transition: "all 0.3s ease"
    });

    // Helper function to get image style
    const getImageStyle = (tabId) => ({
        height: "50px",
        filter: activeTab === tabId
            ? "brightness(0) saturate(100%) invert(17%) sepia(60%) saturate(7476%) hue-rotate(292deg) brightness(90%) contrast(98%)"
            : "none"
    });

    const getIconContainerStyle = (tabId) => ({
        background: "transparent",
        borderRadius: "12px",
        padding: "4px",
        margin: "2px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    });

    return (
        <div
            style={{
                width: "70px",
                marginLeft: "20px",
                height: "89%",
                background: "linear-gradient(180deg, #1F0E27)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center", // Center all items vertically
                borderRadius: "12px",
                paddingTop: 0,
                paddingBottom: 0
            }}
        >
            {/* All sidebar items in one column, centered */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "12px", // More space between items for visual balance
                    width: "100%"
                }}
            >
                {/* SIGNALS - Tab 1 */}
                <div
                    style={getItemStyle("1")}
                    onClick={() => toggleTab("1")}
                >
                    <div style={getIconContainerStyle("1")}> 
                        <img src={signal} alt="" style={getImageStyle("1")} />
                    </div>
                    <div>{t('SIGNALS')}</div>
                </div>

                {/* TRADES - Tab 2 */}
                <div
                    style={getItemStyle("2")}
                    onClick={() => toggleTab("2")}
                >
                    <div style={getIconContainerStyle("2")}> 
                        <img src={finance} alt="" style={getImageStyle("2")} />
                    </div>
                    <div>{t('TRADES')}</div>
                </div>

                {/* MARKET - Tab 3 */}
                <div
                    style={getItemStyle("3")}
                    onClick={() => toggleTab("3")}
                >
                    <div style={getIconContainerStyle("3")}> 
                        <img src={markete} alt="" style={getImageStyle("3")} />
                    </div>
                    <div>{t('MARKET')}</div>
                </div>

                {/* EVENTS - Tab 4 */}
                <div
                    style={getItemStyle("4")}
                    onClick={() => toggleTab("4")}
                >
                    <div style={getIconContainerStyle("4")}> 
                        <img src={Achivements} alt="" style={getImageStyle("4")} />
                    </div>
                    <div>{t('EVENTS')}</div>
                </div>

                {/* HELP - Tab 5 (now in same column) */}
                <div
                    style={getItemStyle("5")}
                    onClick={() => toggleTab("5")}
                >
                    <div style={getIconContainerStyle("5")}> 
                        <img src={help} alt="" style={getImageStyle("5")} />
                    </div>
                    <div>{t('HELP')}</div>
                </div>
            </div>
        </div>
    );
};

export default TabButtonsComponent;
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
const TabButtonsComponent = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState(null); // Start with no tab active
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
    
    // tab 2 = /active-trades
    // tab 3 = /market
    // tab 4 = /events
    // tab 5 = /help



    useEffect(() => {
        // Get the tab from the URL search params
        const tabFromUrl = searchParams.get('tab');

        // Set the active tab if it's valid (1, 2, or 3)
        if (tabFromUrl && ['1', '2', '3', '4','5'].includes(tabFromUrl)) {
            setActiveTab(tabFromUrl);
        } else {
            setActiveTab(null); // If the tab is invalid or not present, reset active tab
        }
    }, [searchParams]); // Watch searchParams for changes

    const layout = useSelector(state => state.Layout);
    const layoutMode = layout?.layoutModeType;
    const bgClass = layoutMode === 'dark' ? 'bg-black' : 'bg-white';
    if(isMobile){
        var idname="mbl-v-bottom-tabs";
        var classes="mobile-view-bottom-tabs mobile-bottom-tabs position-fixed w-100 start-0 end-0 px-2 "+bgClass
    }else{
        var idname="";
        var classes=""
    }
    return (
       
        <>
            <Nav pills className="nav-justified card-footer-tabs fs-17 pb-2">
                <NavItem id="home" className='w-100'>
                    <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({ active: activeTab === "1" })}
                        onClick={() => toggleTab("1")}
                    >
                        <i style={{ fontSize: "22px" }} className="ri-home-line"></i>
                        <p style={{ fontSize: "10px" }} className="mobil-tabls-menu-title mb-0">{t('Terminals')}</p>
                    </NavLink>
                </NavItem>
                <NavItem id="quotes" className='w-100'>
                    <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({ active: activeTab === "2" })}
                        onClick={() => toggleTab("2")}
                    >
                        <i style={{ fontSize: "22px" }} className="ri-arrow-up-down-line"></i>
                        <p style={{ fontSize: "10px" }} className="mobil-tabls-menu-title mb-0">{t('Trades')}</p>
                    </NavLink>
                </NavItem>
                <NavItem id="market" className='w-100'>
                    <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({ active: activeTab === "3" })}
                        onClick={() => toggleTab("3")}
                    >
                        <i style={{ fontSize: "22px" }} className="ri-shopping-bag-2-line"></i>
                        <p style={{ fontSize: "10px" }} className="mobil-tabls-menu-title mb-0">{t('Market')}</p>
                    </NavLink>
                </NavItem>
                <NavItem id="trading" className='w-100'> 
                    <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({ active: activeTab === "4" })}
                        onClick={() => toggleTab("4")}
                    >
                        <i style={{ fontSize: "22px" }} className="ri-trophy-line"></i>
                        <p style={{ fontSize: "10px" }} className="mobil-tabls-menu-title mb-0">{t('Events')}</p>
                    </NavLink>
                </NavItem>
                <NavItem id="market-graph" className='w-100'>
                    <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({ active: activeTab === "5" })}
                        onClick={() => toggleTab("5")}
                    >
                        <i style={{ fontSize: "22px" }} className="ri-questionnaire-line"></i>
                        <p  style={{ fontSize: "10px" }}className="mobil-tabls-menu-title mb-0">{t('Helps')}</p>
                    </NavLink>
                </NavItem>
                {/* <NavItem id="settings">
                    <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({ active: activeTab === "6" })}
                        onClick={() => toggleTab("6")}
                    >
                        <i style={{ fontSize: "28px" }} className="ri-settings-5-line"></i>
                        <p style={{ fontSize: "10px" }} className="mobil-tabls-menu-title mb-0">Setting</p>
                    </NavLink>
                </NavItem> */}
            </Nav>
        </>
);
};

export default TabButtonsComponent;

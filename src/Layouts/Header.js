import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { changeSidebarVisibility } from "../rtk/slices/thunks";
import { selectOpenPositions } from "../rtk/slices/openPositionsSlice/openPositionsSlice";
import LightDark from "../Components/Common/LightDark";
import { setSelectedAccount, toggleModal } from "../rtk/slices/accountTypeSlice/accountTypeSlice";


import { logoSm } from "../utils/config";
import { logoDark } from "../utils/config";
import { logoLight } from "../utils/config";

// Import components
import ProfileDropdown from "../Components/Common/ProfileDropdown";
import LanguageDropdown from "../Components/Common/LanguageDropdown";
import useWindowSize from "../Components/Hooks/useWindowSize";
import PaymentsPanel from "./PaymentsPanel";
import ProfileSidebar from "./ProfileSidebar";
import { tradeAccountsList } from "../rtk/slices/crm-slices/trade/tradeAccountsList";
import { tradeGroups } from "../rtk/slices/crm-slices/trade/tradeGroups";
import { getUser } from "../rtk/slices/crm-slices/user/getUserSlice";
import LanguageSwitcher from "../Components/LanguageSwitcher";
import { useTranslation } from 'react-i18next';
import sqlogo from "../../src/assets/images/logoxq.png"
import { X, ChevronDown, CreditCard, User } from "lucide-react";
import chat from "../../src/assets/images/icons gradient/chat.png"
import { CiCreditCard1 } from "react-icons/ci";
import profile from "../../src/assets/images/icons gradient/Profile.png";
import { IoIosArrowDown } from "react-icons/io";

const Header = ({ onChangeLayoutMode, layoutModeType, headerClass }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isProfleSidebarOpen, setIsProfleSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const { t } = useTranslation();

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const location = useLocation();
  const { tP } = useSelector(selectOpenPositions);
  const selectedAccount = useSelector((state) => state.accountType.selectedAccount) ||
    JSON.parse(localStorage.getItem("selectedAccount")) || {};

  const { tradeAccount, status } = useSelector((state) => state.tradeAccountsList)
  const tradeAccontsSelected = useSelector((state) => state.accountType.selectedAccount)
  const { tradeAccounts } = useSelector((state) => state.accountType);

  const localSelectedAccount = JSON.parse(localStorage.getItem("selectedAccount"))

  const terminalPath = location.pathname === "/dashboard";


  // console.log('selected account  in redux', tradeAccontsSelected);
  // console.log('localSelectedAccount', localSelectedAccount);
  // console.log('all trade accounts ', tradeAccounts);

  const appSettings = JSON.parse(localStorage.getItem('appSettings')) || {};
  const isHiddenBalance = appSettings.hiddenBalances ?? false;


  const handleRefresh = () => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(tradeAccountsList(token)); // Fetch updated data
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      dispatch(tradeAccountsList(storedToken));
    }
  }, [dispatch]);

  const totalProfit = tP;
  const { width } = useWindowSize();


  const binaryLogo = require("../assets/images/appIcon.png");

  const selectDashboardData = createSelector(
    (state) => state.Layout,
    (state) => ({
      sidebarVisibilitytype: state.sidebarVisibilitytype,
    })
  );

  const { sidebarVisibilitytype } = useSelector(selectDashboardData);

  const [search, setSearch] = useState(false);
  const toogleSearch = () => {
    setSearch(!search);
  };

  const toogleMenuBtn = () => {
    const windowSize = document.documentElement.clientWidth;
    dispatch(changeSidebarVisibility("show"));

    if (windowSize > 767)
      document.querySelector(".hamburger-icon").classList.toggle("open");

    if (document.documentElement.getAttribute("data-layout") === "horizontal") {
      document.body.classList.toggle("menu");
    }

    if (
      sidebarVisibilitytype === "show" &&
      (document.documentElement.getAttribute("data-layout") === "vertical" ||
        document.documentElement.getAttribute("data-layout") === "semibox")
    ) {
      if (windowSize < 1025 && windowSize > 767) {
        document.body.classList.remove("vertical-sidebar-enable");
        document.documentElement.setAttribute(
          "data-sidebar-size",
          document.documentElement.getAttribute("data-sidebar-size") === "sm"
            ? ""
            : "sm"
        );
      } else if (windowSize > 1025) {
        document.body.classList.remove("vertical-sidebar-enable");
        document.documentElement.setAttribute(
          "data-sidebar-size",
          document.documentElement.getAttribute("data-sidebar-size") === "sm"
            ? "sm"
            : "sm"
        );
        // document.documentElement.setAttribute('data-sidebar-size', document.documentElement.getAttribute('data-sidebar-size') === 'lg' ? 'sm' : 'sm');
      } else if (windowSize <= 767) {
        document.body.classList.add("vertical-sidebar-enable");
        document.documentElement.setAttribute("data-sidebar-size", "sm");
        // document.documentElement.setAttribute('data-sidebar-size', 'lg');
      }
    }

    if (document.documentElement.getAttribute("data-layout") === "twocolumn") {
      document.body.classList.toggle("twocolumn-panel");
    }
  };

  const isDashboardTab1 = location.pathname === "/dashboard";
  const isDashboardTab2 =
    location.pathname === "/trade" && location.search === "?tab=2";
  const isDashboardTab5 =
    location.pathname === "/trade" && location.search === "?tab=5";

  const handleBackNavigate = () => {
    navigate(-1); // Go back to the previous page
  };

  useEffect(() => {
    if (selectedAccount) {
      localStorage.setItem("selectedAccount", JSON.stringify(selectedAccount));
    }
  }, [selectedAccount]); // Runs whenever selectedAccount changes

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const handleOpenProfileSidebar = () => {
    const storedToken = localStorage.getItem("token");
    // dispatch(getUser(storedToken))
    setIsProfleSidebarOpen(true)
  }

  return (
    <React.Fragment>

      <header
        id="page-topbar"

      >
        <div className="layout-width " style={{ background: "#1F222A" }} >
          <div className="navbar-header " style={{ paddingTop: "20px", paddingBottom: "30px", }}>


            {
              location.pathname === "/dashboard" ? (
                <>
                  <button
                    className="Ws3yi76Z46 _0H5QNHpHcI -ClIVZvrPn"
                    data-test="header-avatar"
                    // style={{ width: "33px", height: "33px", }}

                    onClick={() => handleOpenProfileSidebar()}
                  >
                    <div className="e9cau5CvLL">
                      <div
                        className="LLgzizDPm7 Z-lA-u7lap WzNFf7XB51"
                        style={{ backgroundColor: "none", padding: "10px" }}
                      >
                        <img src={sqlogo} style={{ width: "150px", height: "25px", }} alt="XQTrade Logo" />
                      </div>
                    </div>
                    <div className="liCZ0ygao-"></div>
                    <div className="_3UzYnAjOc4">
                      <div
                        className="_1PRMjiCBcFTg"
                        data-test="user-status-badge-starter"
                        style={{ width: "16px", height: "16px", fontSize: "12px", }}
                      >
                        <svg
                          aria-hidden="true"
                          className="ohGHbMkZKR kuWzrsQ9Fp"
                          focusable="false"
                          role="presentation"
                          viewBox="0 0 24 24"
                          data-icon="icon-chevronstarterlist"
                        >
                          <path
                            fill="#0094FF"
                            d="M5 10.1 12 8l7 2.1V15l-7-2.1L5 15v-4.9Z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </button>
                </>
              ) : location.pathname === "/profile-settings" ||
                location.pathname === "/active-trades" ||
                location.pathname === "/market" ||
                location.pathname === "/events" ||
                location.pathname === "/help" ? (

                <>
                  <div className="d-flex align-items-center gap-4">


                    <button
                      className="Ws3yi76Z46 _0H5QNHpHcI -ClIVZvrPn"
                      data-test="header-avatar"
                      style={{ width: "33px", height: "33px", }}

                      onClick={() => handleOpenProfileSidebar()}
                    >
                      <div className="e9cau5CvLL">
                        <div className="LLgzizDPm7 Z-lA-u7lap WzNFf7XB51">
                          <svg
                            aria-hidden="true"
                            className="ohGHbMkZKR"
                            focusable="false"
                            role="presentation"
                            viewBox="0 0 24 24"
                            data-icon="icon-user"
                          >
                            <path
                              fill="white"
                              fillRule="evenodd"
                              d="M12 3a5 5 0 0 0-3.456 8.613c-1.894.74-3.174 2.046-4.01 3.346a10.917 10.917 0 0 0-1.506 3.789c-.005.031-.01.056-.012.075l-.004.023-.001.008v.005a1 1 0 0 0 1.979.285v-.007a8.301 8.301 0 0 1 .23-.935 8.914 8.914 0 0 1 .996-2.161C7.198 14.514 8.91 13 12 13c3.091 0 4.803 1.514 5.784 3.04a8.915 8.915 0 0 1 1.218 3.055l.006.035.001.007.001.005v.002a1 1 0 0 0 1.98-.285v-.006l-.002-.007-.003-.023a7.202 7.202 0 0 0-.063-.333 10.92 10.92 0 0 0-1.455-3.53c-.837-1.301-2.116-2.608-4.01-3.347A5 5 0 0 0 12 3ZM9 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div className="liCZ0ygao-"></div>
                      <div className="_3UzYnAjOc4">
                        <div
                          className="_1PRMjiCBcFTg"
                          data-test="user-status-badge-starter"
                          style={{ width: "16px", height: "16px", fontSize: "12px", }}
                        >
                          <svg
                            aria-hidden="true"
                            className="ohGHbMkZKR kuWzrsQ9Fp"
                            focusable="false"
                            role="presentation"
                            viewBox="0 0 24 24"
                            data-icon="icon-chevronstarterlist"
                          >
                            <path
                              fill="#0094FF"
                              d="M5 10.1 12 8l7 2.1V15l-7-2.1L5 15v-4.9Z"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </button>

                    {!(isMobile && location.pathname === "/profile-settings") && (
                      <button
                        className="bg-transparent border-0 fs-3"
                        onClick={() => navigate('/')}
                      >
                        <i className="ri-home-2-line"></i>
                      </button>
                    )}

                  </div>
                </>

              ) : (
                <>
                  <button className="bg-transparent border-0 fs-3" onClick={handleBackNavigate}>
                    <i className="ri-arrow-left-s-line"></i>
                  </button>
                </>
              )
            }

            {/* </Link> */}

            <div className="d-none">
              <div className="navbar-brand-box horizontal-logo">
                <Link to="/" className="logo logo-dark">
                  <span className="logo-sm">
                    <img src={binaryLogo} alt="" height="22" />
                  </span>
                  <span className="logo-lg">
                    <img src={binaryLogo} alt="" height="30" />
                  </span>
                </Link>

                <Link to="/" className="logo logo-light">
                  <span className="logo-sm">
                    <img src={binaryLogo} alt="" height="22" />
                  </span>
                  <span className="logo-lg">
                    <img src={binaryLogo} alt="" height="30" />
                  </span>
                </Link>
              </div>

              <button
                onClick={toogleMenuBtn}
                type="button"
                className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger d-none"
                id="topnav-hamburger-icon"
              >
                <span className="hamburger-icon">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>
            </div>





            <div className="d-flex align-items-center " style={{ width: "40%" }}>

              {/* Bonus Section */}

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: "5", marginRight: "10px", background: 'linear-gradient(to right, #6800ff, #000000)', borderRadius: "10px" }}>
                <div>
                  <img src={chat} alt="" style={{ height: '50px', borderRadius: '10px', padding: '5px' }} />
                </div>
                <div style={{ color: 'white' }}>
                  <div style={{ fontSize: '15px', fontWeight: 'semibold', textShadow: '0 0 10px #6A65F1' }}>GET 50% BONUS</div>
                  <div style={{ fontSize: '12px', color: '#D1D5DB', textShadow: '0 0 5px #6A65F1' }}>ON YOUR FIRST DEPOSIT</div>
                </div>
                <button
                  style={{
                    color: '#9CA3AF',
                    background: 'none',
                    border: 'none',
                    height: '24px',
                    width: '24px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    padding: 0,
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.backgroundColor = '#1A1A2E';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#9CA3AF';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <span style={{ position: 'absolute', top: '5%', left: '50%', fontSize: '20px', transform: 'translate(-50%, -50%)' }}>×</span>
                </button>
              </div>
              { /*qrt section*/}
              <div
                style={{
                  display: "inline-block",
                  padding: "1px",
                  borderRadius: "17px",
                  background: "linear-gradient(90deg, #ff00ff, #8000ff)",
                  position: "relative", // for positioning the icon
                }}
              >
                <select
                  style={{
                    appearance: "none",
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    backgroundColor: "#0f0f0f",
                    color: "#ffffff",
                    padding: "11px 29px 11px 10px", // space for icon
                    border: "none",
                    borderRadius: "17px",
                    fontWeight: "500",
                    fontFamily: "sans-serif",
                    // fontSize: "14px",
                    cursor: "pointer",
                    paddingRight: "32px", // space for icon
                  }}
                  defaultValue="QT REAL USD"
                >
                  <option value="QT REAL USD" style={{ fontSize: "14px" }}>
                    QT REAL USD
                  </option>
                  <option value="QT DEMO USD">QT DEMO USD</option>
                  <option value="QT BITCOIN">QT BITCOIN</option>
                </select>

                {/* Custom arrow icon */}
                <IoIosArrowDown
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none", // allows clicking through to select
                    color: "#fff",
                    fontSize: "18px",
                  }}
                />
              </div>

              {/* Right Section */}
              <button
                style={{
                  background: 'linear-gradient(to right, #8000ff, #ff00ff)',
                  border: 'none',
                  borderRadius: '18px',
                  padding: '3px 15px',
                  fontSize: '14px',
                  gap: '15px',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  marginLeft: '15px',
                  fontWeight: 'semibold',
                }}
              >
                <span
                  style={{
                    width: "40px", // Increased from 20px to 40px
                    height: "40px", // Added height to match width for proportionality
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <CiCreditCard1 size={40} />
                </span>
                TOP UP
              </button>
              {/* profile Section */}
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2px solid #8000ff", // optional gradient accent
                  boxShadow: "0 0 5px rgba(128, 0, 255, 0.5)",
                  marginLeft: "15px",
                }}
              >
                <img
                  src={profile}
                  alt="profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>





            </div>
          </div>
        </div>
      </header>
      {
      }


      <PaymentsPanel
        isOpen={isPanelOpen}
        toggle={() => setIsPanelOpen(false)}
      />

      <ProfileSidebar
        isOpen={isProfleSidebarOpen}
        toggle={() => setIsProfleSidebarOpen(false)}
      />
      =
    </React.Fragment>
  );
};

export default Header;

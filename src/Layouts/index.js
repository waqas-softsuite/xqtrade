import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import withRouter from "../Components/Common/withRouter";

//import Components
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import RightSidebar from "../Components/Common/RightSidebar";
import { logoLight } from "../utils/config";


//import actions
import {
  changeLayout,
  changeSidebarTheme,
  changeLayoutMode,
  changeLayoutWidth,
  changeLayoutPosition,
  changeTopbarTheme,
  changeLeftsidebarSizeType,
  changeLeftsidebarViewType,
  changeSidebarImageType,
  changeSidebarVisibility,
} from "../rtk/slices/thunks";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import Pricing from "../pages/DashboardCrypto/Pricing/Pricing";
import { Col, Row } from "reactstrap";
import useWindowSize from "../Components/Hooks/useWindowSize";
import TradingModal from "../pages/DashboardCrypto/TradingModal";

import TabButtonsComponent from "./BottomNavTabs/TabButtonsComponent";

const Layout = (props) => {
  const [headerClass, setHeaderClass] = useState("");

  const dispatch = useDispatch();

  const { width } = useWindowSize();
  const windowSize = document.documentElement.clientWidth;
  const isMobile = windowSize <= 767;
  const selectLayoutState = (state) => state.Layout;
  const selectLayoutProperties = createSelector(
    selectLayoutState,
    (layout) => ({
      layoutType: layout.layoutType,
      leftSidebarType: layout.leftSidebarType,
      layoutModeType: layout.layoutModeType,
      layoutWidthType: layout.layoutWidthType,
      layoutPositionType: layout.layoutPositionType,
      topbarThemeType: layout.topbarThemeType,
      leftsidbarSizeType: layout.leftsidbarSizeType,
      leftSidebarViewType: layout.leftSidebarViewType,
      leftSidebarImageType: layout.leftSidebarImageType,
      preloader: layout.preloader,
      sidebarVisibilitytype: layout.sidebarVisibilitytype,
    })
  );
  // Inside your component
  const {
    layoutType,
    leftSidebarType,
    layoutModeType,
    layoutWidthType,
    layoutPositionType,
    topbarThemeType,
    leftsidbarSizeType,
    leftSidebarViewType,
    leftSidebarImageType,
    preloader,
    sidebarVisibilitytype,
  } = useSelector(selectLayoutProperties);

  /*
    layout settings
    */
  useEffect(() => {
    if (
      layoutType ||
      leftSidebarType ||
      layoutModeType ||
      layoutWidthType ||
      layoutPositionType ||
      topbarThemeType ||
      leftsidbarSizeType ||
      leftSidebarViewType ||
      leftSidebarImageType ||
      sidebarVisibilitytype
    ) {
      window.dispatchEvent(new Event("resize"));
      dispatch(changeLeftsidebarViewType(leftSidebarViewType));
      dispatch(changeLeftsidebarSizeType(leftsidbarSizeType));
      dispatch(changeSidebarTheme(leftSidebarType));
      dispatch(changeLayoutMode(layoutModeType));
      dispatch(changeLayoutWidth(layoutWidthType));
      dispatch(changeLayoutPosition(layoutPositionType));
      dispatch(changeTopbarTheme(topbarThemeType));
      dispatch(changeLayout(layoutType));
      dispatch(changeSidebarImageType(leftSidebarImageType));
      dispatch(changeSidebarVisibility(sidebarVisibilitytype));
    }
  }, [
    layoutType,
    leftSidebarType,
    layoutModeType,
    layoutWidthType,
    layoutPositionType,
    topbarThemeType,
    leftsidbarSizeType,
    leftSidebarViewType,
    leftSidebarImageType,
    sidebarVisibilitytype,
    dispatch,
  ]);
  /*
    call dark/light mode
    */
  const onChangeLayoutMode = (value) => {
    if (changeLayoutMode) {
      dispatch(changeLayoutMode(value));
    }
  };

  // class add remove in header
  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation, true);
  });

  function scrollNavigation() {
    var scrollup = document.documentElement.scrollTop;
    if (scrollup > 50) {
      setHeaderClass("topbar-shadow");
    } else {
      setHeaderClass("");
    }
  }

  useEffect(() => {
    if (
      sidebarVisibilitytype === "show" ||
      layoutType === "vertical" ||
      layoutType === "twocolumn"
    ) {
      document.querySelector(".hamburger-icon").classList.remove("open");
    } else {
      document.querySelector(".hamburger-icon") &&
        document.querySelector(".hamburger-icon").classList.add("open");
    }
  }, [sidebarVisibilitytype, layoutType]);

  return (
    <React.Fragment>
      <div id="layout-wrapper">
        <Header
          headerClass={headerClass}
          layoutModeType={layoutModeType}
          onChangeLayoutMode={onChangeLayoutMode}
        />

        {/* <Sidebar
                    layoutType={layoutType}
                /> */}
        <div className="main-content">
          {!isMobile ? (
            <>
              {/* <TradingModal /> */}

              <div className="flex " style={{ display: 'flex', justifyContent: "space-between", width: '100%' }}>
                <div className="nav-btn-sidebar bg-red-200" style={{ border: "3px solid red", marginRight: "10px" }}>
                  <img style={{ marginTop: '19px' }} src={logoLight} alt="" />
                  <TabButtonsComponent />
                  <div></div>
                </div>

                <div className="nav-btn-sidebar bg-green-200" style={{ border: "3px solid green", marginRight: "10px" }}>
                  <img style={{ marginTop: '19px' }} src={logoLight} alt="" />
                  <TabButtonsComponent />
                  <div></div>
                </div>

                <div className="nav-btn-sidebar bg-blue-200" style={{ border: "3px solid blue", marginRight: "10px" }}>
                  <img style={{ marginTop: '19px' }} src={logoLight} alt="" />
                  <TabButtonsComponent />
                  <div></div>
                </div>

                <div className="nav-btn-sidebar bg-yellow-200" style={{ border: "3px solid orange", marginRight: "10px" }}>
                  <img style={{ marginTop: '19px' }} src={logoLight} alt="" />
                  <TabButtonsComponent />
                  <div></div>
                </div>
              </div>



            </>
          ) : (
            <>{props.children}</>
          )}

          {isMobile && (
            <>
              <TabButtonsComponent />
            </>
          )}

          {/* <Footer/> */}
        </div>
      </div>
      <RightSidebar />
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.object,
};

export default withRouter(Layout);

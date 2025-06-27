import React from "react";
import { FaChartLine, FaUserCircle, FaHistory, FaCog, FaComments, FaQuestionCircle, FaWallet } from "react-icons/fa";
import finance from "../assets/images/icons gradient/Finanace.png";
import signal from "../assets/images/icons gradient/Frame 2.png";
import profile from "../assets/images/icons gradient/Profile.png";
import markete from "../assets/images/icons gradient/Market.png";
import Achivements from "../assets/images/icons gradient/Achivements.png";
import chat from "../assets/images/icons gradient/chat.png";
import help from "../assets/images/icons gradient/Help.png";
const Sidebar = () => {
    return (
        <div
            style={{
                // width: "100px",
                height: "95%",
                background: "linear-gradient(to bottom, #2a0040, #4b0082)", // Purple gradient background
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 0",
                borderTopRightRadius: "20px",
                borderBottomRightRadius: "20px",
                borderLeft: "3px solid",
                borderImage: "linear-gradient(to bottom, #8000ff, #ff00ff) 1" // Gradient border
            }}
        >
            {/* Top icons (above) */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px", // Removed gap to match no spacing
                    flexGrow: 1
                }}
            >
                <div style={{ color: "#fff", textAlign: "center", fontSize: "12px" }}>
                    <img src={signal} alt="" style={{ width: "30px", filter: "brightness(0) saturate(100%) invert(28%) sepia(97%) saturate(2000%) hue-rotate(260deg)" }} />
                    <div style={{ marginTop: "5px" }}>FINANCE</div>
                </div>
                <div style={{ color: "#fff", textAlign: "center", fontSize: "12px" }}>
                    <img src={finance} alt="" style={{ width: "30px", filter: "brightness(0) saturate(100%) invert(28%) sepia(97%) saturate(2000%) hue-rotate(260deg)" }} />
                    <div style={{ marginTop: "5px" }}>PROFILE</div>
                </div>
                <div style={{ color: "#fff", textAlign: "center", fontSize: "12px" }}>
                    <img src={profile} alt="" style={{ width: "30px", filter: "brightness(0) saturate(100%) invert(28%) sepia(97%) saturate(2000%) hue-rotate(260deg)" }} />
                    <div style={{ marginTop: "5px" }}>HISTORY</div>
                </div>
                <div style={{ color: "#fff", textAlign: "center", fontSize: "12px" }}>
                    <img src={markete} alt="" style={{ width: "30px", filter: "brightness(0) saturate(100%) invert(28%) sepia(97%) saturate(2000%) hue-rotate(260deg)" }} />
                    <div style={{ marginTop: "5px" }}>MARKET</div>
                </div>
                <div style={{ color: "#fff", textAlign: "center", fontSize: "12px" }}>
                    <img src={Achivements} alt="" style={{ width: "40px", filter: "brightness(0) saturate(100%) invert(28%) sepia(97%) saturate(2000%) hue-rotate(260deg)" }} />
                    <div style={{ marginTop: "5px" }}>ACHIEVEMENTS</div>
                </div>
            </div>

            {/* Bottom icons and Logout button (below) */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0px", // Removed gap to match no spacing
                    paddingBottom: "20px"
                }}
            >
                <div style={{ color: "#fff", textAlign: "center", fontSize: "12px" }}>
                    <img src={chat} alt="" style={{ width: "30px", filter: "brightness(0) saturate(100%) invert(28%) sepia(97%) saturate(2000%) hue-rotate(260deg)" }} />
                    <div style={{ marginTop: "5px" }}>CHAT</div>
                </div>
                <div style={{ color: "#fff", textAlign: "center", fontSize: "12px" }}>
                    <img src={help} alt="" style={{ width: "30px", filter: "brightness(0) saturate(100%) invert(28%) sepia(97%) saturate(2000%) hue-rotate(260deg)" }} />
                    <div style={{ marginTop: "5px" }}>HELP</div>
                </div>

                {/* Logout Button (not in image, but included as per your request) */}
                <button
                    style={{
                        background: "linear-gradient(to right, #ff00ff, #8000ff)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "10px",
                        padding: "6px 14px",
                        fontSize: "12px",
                        marginTop: "20px", // Space above Logout button
                        cursor: "pointer",
                        width: "80px",
                        textAlign: "center"
                    }}
                >
                    LOGOUT
                </button>
            </div>
        </div>
    );
};

export default Sidebar;

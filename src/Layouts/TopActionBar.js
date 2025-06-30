// TopActionBar.jsx
import React, { useState, useRef } from "react";
import { FaChartLine, FaChartBar, FaFeatherAlt, FaThLarge } from "react-icons/fa";
import TimeSelectorModal from "./TimeSelectorModal";
import ChartBarModal from "./ChartBarModal";
import FeatherModal from "./FeatherModal";
import ThLargeModal from "./ThLargeModal";
import DropdownUI from "../Layouts/AssetSelector"; // Adjust the import path as necessary

const TopActionBar = () => {
    const [activeModal, setActiveModal] = useState(null); // null, "line", "bar", "feather", "th"
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null); // Ref to position the dropdown

    const icons = [FaChartLine, FaChartBar, FaFeatherAlt, FaThLarge];

    const handleIconClick = (index) => {
        const modalNames = ["line", "bar", "feather", "th"];
        setActiveModal(modalNames[index]);
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: "#160e2f",
                    padding: "8px 12px",
                    marginLeft: "10px",
                    borderRadius: "10px",
                    alignItems: "center",
                    marginBottom: "10px",
                    width: "100%", // Ensure full width
                }}
            >
                <div
                    ref={dropdownRef} // Attach ref to the CHF/JPY button
                    style={{
                        backgroundColor: "#1e153a",
                        padding: "6px 14px",
                        borderRadius: "20px",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "13px",
                        cursor: "pointer",
                        position: "relative", // Needed for absolute positioning of dropdown
                    }}
                    onClick={handleDropdownToggle}
                >
                    CHF/JPY ▼
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                    {icons.map((Icon, i) => (
                        <div
                            key={i}
                            onClick={() => handleIconClick(i)}
                            style={{
                                backgroundColor: "#1e153a",
                                padding: "10px",
                                borderRadius: "50%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "white",
                                cursor: "pointer",
                            }}
                        >
                            <Icon size={14} />
                        </div>
                    ))}
                </div>
            </div>

            {activeModal === "line" && <TimeSelectorModal onClose={() => setActiveModal(null)} />}
            {activeModal === "bar" && <ChartBarModal onClose={() => setActiveModal(null)} />}
            {activeModal === "feather" && <FeatherModal onClose={() => setActiveModal(null)} />}
            {activeModal === "th" && <ThLargeModal onClose={() => setActiveModal(null)} />}

            {isDropdownOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.5)", // Darkened background
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start", // Align to the top
                        zIndex: 1000,
                    }}
                    onClick={handleDropdownToggle} // Close modal when clicking outside
                >
                    <div
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                        style={{
                            position: "absolute",
                            top: dropdownRef.current ? dropdownRef.current.getBoundingClientRect().bottom + window.scrollY : 0, // Position below the button
                            left: dropdownRef.current ? dropdownRef.current.getBoundingClientRect().left + window.scrollX : 0, // Align with the button's left
                            width: "300px", // Match the width from your screenshot
                            transform: "translateY(20px)", // Small offset to avoid overlapping with the button
                        }}
                    >
                        <DropdownUI onClose={handleDropdownToggle} />
                    </div>
                </div>
            )}
        </>
    );
};

export default TopActionBar;
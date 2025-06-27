import React, { useState } from "react";
import { FaChartLine, FaChartBar, FaFeatherAlt, FaThLarge } from "react-icons/fa";
import TimeSelectorModal from "./TimeSelectorModal";
import ChartBarModal from "./ChartBarModal";
import FeatherModal from "./FeatherModal";
import ThLargeModal from "./ThLargeModal";

const TopActionBar = () => {
    const [activeModal, setActiveModal] = useState(null); // null, "line", "bar", "feather", "th"

    const icons = [FaChartLine, FaChartBar, FaFeatherAlt, FaThLarge];

    const handleIconClick = (index) => {
        const modalNames = ["line", "bar", "feather", "th"];
        setActiveModal(modalNames[index]);
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: "#160e2f",
                    padding: "8px 12px",
                    borderRadius: "10px",
                    alignItems: "center",
                    marginBottom: "10px",
                }}
            >
                <div
                    style={{
                        backgroundColor: "#1e153a",
                        padding: "6px 14px",
                        borderRadius: "20px",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "13px",
                        cursor: "pointer",
                    }}
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
        </>
    );
};

export default TopActionBar;

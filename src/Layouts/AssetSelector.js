import React, { useState } from "react";
import TopActionBar from "./TopActionBar";

const categories = [
    "Currencies",
    "Cryptocurrencies",
    "Commodities",
    "Stocks",
    "Indices",
    "Favorites",
    "Schedule",
];

const currencies = [
    { flag: "🇦🇺🇳🇿", name: "AUD/NZD OTC" },
    { flag: "🇦🇺🇺🇸", name: "AUD/USD OTC" },
    { flag: "🇧🇭🇨🇳", name: "BHD/CNY OTC" },
    { flag: "🇨🇭🇯🇵", name: "CHF/JPY OTC" },
    { flag: "🇪🇺🇨🇭", name: "EUR/CHF OTC" },
    { flag: "🇪🇺🇳🇿", name: "EUR/NZD OTC" },
    { flag: "🇳🇿🇯🇵", name: "NZD/JPY OTC" },
    { flag: "🇳🇿🇺🇸", name: "NZD/USD OTC" },
    { flag: "🇶🇦🇨🇳", name: "QAR/CNY OTC" },
    { flag: "🇺🇸🇨🇳", name: "USD/CNH OTC" },
    { flag: "🇺🇸🇨🇴", name: "USD/COP OTC" },
    { flag: "🇺🇸🇮🇩", name: "USD/IDR OTC" },
    { flag: "🇺🇸🇮🇳", name: "USD/INR OTC" },
];

const DropdownUI = () => {
    const [activeTab, setActiveTab] = useState("Currencies");
    const [search, setSearch] = useState("");

    const filteredCurrencies = currencies.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div style={{ display: "block", justifyContent: "center", paddingLeft: "10px", gap: "10px" }}>
                <TopActionBar />
                <div
                    style={{
                        display: "flex",
                        width: "500px",
                        height: "400px",
                        backgroundColor: "#160e2f",
                        color: "white",
                        borderRadius: "10px",
                        overflow: "hidden",
                        fontFamily: "sans-serif",
                        fontSize: "14px",
                        boxShadow: "0 0 10px rgba(0,0,0,0.4)",
                    }}
                >
                    {/* Left Panel - Tabs */}
                    <div
                        style={{
                            width: "30%",
                            borderRight: "1px solid #261b49",
                            padding: "16px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <div>
                            {categories.map((cat, index) => (
                                <div
                                    key={index}
                                    onClick={() => setActiveTab(cat)}
                                    style={{
                                        padding: "8px 0",
                                        color: activeTab === cat ? "#fff" : "#aaa",
                                        fontWeight: activeTab === cat ? "bold" : "normal",
                                        cursor: "pointer",
                                    }}
                                >
                                    {cat}
                                </div>
                            ))}
                        </div>
                        <div
                            style={{
                                fontSize: "10px",
                                color: "#999",
                                lineHeight: "1.4",
                            }}
                        >
                            OTC quotes are provided directly by international banks, liquidity
                            providers and market makers without the supervision of an exchange.
                        </div>
                    </div>

                    {/* Right Panel - Content */}
                    <div
                        style={{
                            width: "70%",
                            padding: "16px",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {/* Search only for Currencies tab */}
                        {activeTab === "Currencies" && (
                            <input
                                type="text"
                                placeholder="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{
                                    background: "#1e153a",
                                    border: "1px solid #2f2460",
                                    borderRadius: "4px",
                                    padding: "8px 12px",
                                    color: "#fff",
                                    marginBottom: "12px",
                                    outline: "none",
                                }}
                            />
                        )}

                        <div style={{ flex: 1, overflowY: "auto" }}>
                            {activeTab === "Currencies" ? (
                                filteredCurrencies.map((item, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            padding: "8px 0",
                                            borderBottom: "1px solid #2a2152",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "6px",
                                            }}
                                        >
                                            <span style={{ fontSize: "16px" }}>⭐</span>
                                            <span>{item.flag}</span>
                                            <span>{item.name}</span>
                                        </div>
                                        <div style={{ color: "#7fffc5" }}>+92%</div>
                                    </div>
                                ))
                            ) : (
                                <div style={{ color: "#aaa", textAlign: "center", marginTop: "100px" }}>
                                    No data available for <strong>{activeTab}</strong>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DropdownUI;

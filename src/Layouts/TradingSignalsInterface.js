import React, { useState } from 'react';
import { Settings, HelpCircle, Copy } from 'lucide-react';

const TradingSignalsInterface = () => {
    const [activeTab, setActiveTab] = useState('All');

    const signals = [
        { pair: 'CHF/JPY', direction: 'up', price: '$1', copied: 77, time: '01:15', status: 'Copy Signal' },
        { pair: 'CHF/JPY', direction: 'down', price: '$1', copied: 120, time: '01:40', status: 'Copy Signal' },
        { pair: 'CHF/JPY', direction: 'up', price: '$1', copied: 95, time: '02:40', status: 'Copy Signal' },
        { pair: 'CHF/JPY', direction: 'down', price: '$1', copied: 36, time: '08:40', status: 'Copy Signal' },
        { pair: 'CHF/JPY', direction: 'down', price: '$1', copied: 31, time: '13:40', status: 'Copy Signal' },
        { pair: 'CHF/JPY', direction: 'up', price: '$1', copied: 89, time: '50:40', status: 'Copy Signal' },
        { pair: 'CHF/JPY', direction: 'up', price: '$1', copied: 407, time: '10:40', status: 'Copy Signal' },
        { pair: 'CHF/JPY', direction: 'down', price: '$1', copied: 488, time: '07:40', status: 'Copy Signal' },
        { pair: 'CHF/JPY', direction: 'up', price: '$1', copied: 31, time: '20:40', status: 'Copy Signal' },
        { pair: 'CHF/JPY', direction: 'up', price: '$1', copied: 422, time: '34:40', status: 'Copy Signal' },
        { pair: 'CHF/JPY', direction: 'down', price: '$1', copied: 587, time: '03:26:40', status: 'Copy Signal' }
    ];

    const getArrowIcon = (direction) => {
        if (direction === 'up') {
            return (
                <div style={{
                    width: '0',
                    height: '0',
                    borderLeft: '6px solid transparent',
                    borderRight: '6px solid transparent',
                    borderBottom: '10px solid #10b981',
                    marginRight: '8px'
                }}></div>
            );
        } else {
            return (
                <div style={{
                    width: '0',
                    height: '0',
                    borderLeft: '6px solid transparent',
                    borderRight: '6px solid transparent',
                    borderTop: '10px solid #ef4444',
                    marginRight: '8px'
                }}></div>
            );
        }
    };

    const getTimeAgo = (index) => {
        const times = ['1 min ago', '3 min ago', '4 min ago', '7 min ago', '1 min ago', '2 min ago', '4 min ago', '12 min ago', '6 min ago', '8 min ago', '34 min ago'];
        return times[index] || '1 min ago';
    };

    return (
        <div style={{
            backgroundColor: '#1a0b2e',
            color: 'white',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            height: '70vh',
            marginRight: '20px',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                borderBottom: '1px solid #2d1b47'
            }}>
                <h1 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    margin: 0,
                    background: 'linear-gradient(45deg, #8b5cf6, #a855f7)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    Signals
                </h1>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <HelpCircle size={24} style={{ color: '#9ca3af', cursor: 'pointer' }} />
                    <Settings size={24} style={{ color: '#9ca3af', cursor: 'pointer' }} />
                </div>
            </div>

            {/* Tabs */}
            <div style={{
                display: 'flex',
                padding: '0 20px',
                borderBottom: '1px solid #2d1b47'
            }}>
                {['Updates', 'All'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: activeTab === tab ? '#8b5cf6' : '#9ca3af',
                            padding: '16px 24px',
                            fontSize: '14px',
                            cursor: 'pointer',
                            borderBottom: activeTab === tab ? '2px solid #8b5cf6' : '2px solid transparent',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Signals List */}
            <div style={{
                padding: '0 15px',
                overflowY: 'auto',
                flex: 1,
                scrollbarWidth: 'thin', // For Firefox
                scrollbarColor: '#8b5cf6 #2d1b47', // Thumb and track colors for Firefox
            }}>
                <style>
                    {`
                        /* For WebKit browsers (Chrome, Safari, Edge) */
                        div::-webkit-scrollbar {
                            width: 8px;
                        }
                        div::-webkit-scrollbar-track {
                            background: #2d1b47;
                            border-radius: 4px;
                        }
                        div::-webkit-scrollbar-thumb {
                            background: #8b5cf6;
                            border-radius: 4px;
                        }
                        div::-webkit-scrollbar-thumb:hover {
                            background: #a855f7;
                        }
                    `}
                </style>
                {signals.map((signal, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '14px 0',
                            borderBottom: index < signals.length - 1 ? '1px solid #2d1b47' : 'none'
                        }}
                    >
                        {/* Left side - Currency pair and arrow */}
                        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
                                {getArrowIcon(signal.direction)}
                                <div>
                                    <div style={{ fontSize: '14px', fontWeight: '400', color: 'white' }}>
                                        {signal.pair}
                                    </div>
                                    <div style={{ fontSize: '14px', color: '#9ca3af' }}>
                                        {signal.price}
                                    </div>
                                </div>
                            </div>
                            <div style={{ fontSize: '12px', color: '#6b7280' }}>
                                Copied : {signal.copied} times
                            </div>
                        </div>

                        {/* Center - Time */}
                        <div style={{
                            fontSize: '14px',
                            color: '#9ca3af',
                            marginRight: '16px'
                        }}>
                            {signal.time}
                        </div>

                        {/* Right side - Copy button */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <button
                                style={{
                                    background: 'linear-gradient(45deg, #7c3aed, #8b5cf6)',
                                    border: 'none',
                                    color: 'white',
                                    padding: '4px 9px',
                                    borderRadius: '15px',
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    marginBottom: '4px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.transform = 'scale(1.05)';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.transform = 'scale(1)';
                                }}
                            >
                                <Copy size={12} />
                                {signal.status}
                            </button>
                            <div style={{ fontSize: '10px', color: '#6b7280' }}>
                                {getTimeAgo(index)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TradingSignalsInterface;
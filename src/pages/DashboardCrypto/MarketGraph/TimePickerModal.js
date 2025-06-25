import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, Button, Nav, NavItem, NavLink, TabContent, TabPane, Input } from "reactstrap";
import { TimePicker } from "react-ios-time-picker";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

function formatCurrentTimeTo10AMFormat() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0'); // Ensure two digits
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    return `${hours}:${minutes} ${ampm}`;
}

const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();  // 24-hour format (e.g., 16)
    let minutes = now.getMinutes().toString().padStart(2, "0"); // Ensure two-digit minutes

    return `${hours}:${minutes}`; // Correct format for react-ios-time-picker
};



// Example usage:
const currentTimeString = getCurrentTime();


const TimePickerModal = ({ isOpen, toggle, onSelectionChange }) => {
      const { t } = useTranslation();
    
    const currentTime = formatCurrentTimeTo10AMFormat();
    const [activeTab, setActiveTab] = useState("1");
    const [timeValue, setTimeValue] = useState(getCurrentTime()); // ✅ Always start with valid time format
    const [timeValue1, setTimeValue1] = useState("10:00 AM");
    const [priceValue, setPriceValue] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);  // Stores "time" or "price"



    const toggleTab = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };




    const handleContinue = () => {
        if (activeTab === "1") {
            onSelectionChange({ type: "time", value: timeValue });
            setTimeout(() => {
                const saveButton = document.querySelector(".react-ios-time-picker-btn:not(.react-ios-time-picker-btn-cancel)");
                if (saveButton) {
                    saveButton.click();  // Simulate Save Button Click
                }
            }, 200);
        } else {
            onSelectionChange({ type: "price", value: priceValue });
        }
        toggle(); // Close the modal
    };

    const handleModalOpened = () => {
        const newTime = getCurrentTime()
        setTimeValue(newTime); // ✅ Always update to the current time
        setOpen(true);
    };


    const handleModalClosed = () => {
        setOpen(false);
    };

    const handleTimeChange = (newTime) => {
        const now = new Date();
        const currentTime = getCurrentTime(); // Get current time in "HH:mm" format
        if (newTime < currentTime) {
            alert("You cannot select a past time!");
            setTimeValue(currentTime); // Reset to current time
        } else {
            setTimeValue(newTime); // Set valid time
        }
    };


    useEffect(() => {
        const saveButton = document.querySelector(".react-ios-time-picker-btn:not(.react-ios-time-picker-btn-cancel)");

        if (saveButton) {
            const handleSaveClick = () => {
                handleContinue(); // Call handleContinue when Save is clicked
            };

            saveButton.addEventListener("click", handleSaveClick);

            return () => {
                saveButton.removeEventListener("click", handleSaveClick);
            };
        }
    }, [isOpen]); // Run effect when modal opens




    useEffect(() => {
        if (isOpen && activeTab === "1") {
            setTimeout(() => {
                const timePickerDiv = document.querySelector(".react-ios-time-picker-main");
                if (timePickerDiv) {
                    timePickerDiv.click(); // Simulate a click
                }
            }, 350); // Slight delay to ensure it's rendered
        }
    }, [isOpen, activeTab]);



    return (
        <Modal isOpen={isOpen} toggle={toggle} centered className="bottom-up-modal" onOpened={handleModalOpened} onClosed={handleModalClosed} >
            <ModalHeader >
                <Nav tabs justified className="w-100 d-flex">
                    <NavItem className="flex-grow-1 text-center">
                        <NavLink
                            className={classnames("tab-link", { active: activeTab === "1" })}
                            onClick={() => toggleTab("1")}
                        >
                            By Time
                        </NavLink>
                    </NavItem>
                    <NavItem className="flex-grow-1 text-center">
                        <NavLink
                            className={classnames("tab-link", { active: activeTab === "2" })}
                            onClick={() => toggleTab("2")}
                        >
                            By Price
                        </NavLink>
                    </NavItem>
                </Nav>
            </ModalHeader>
            <ModalBody className="text-center">
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        {open && (
                            <TimePicker
                                onChange={handleTimeChange}
                                value={timeValue} // Always provide a valid time
                                use12Hours={false} // ✅ Ensure 24-hour format
                                isOpen={open}
                            />
                        )}
                    </TabPane>
                    <TabPane tabId="2">
                        <Input
                            type="number"
                            placeholder="Enter Price"
                            value={priceValue}
                            onChange={(e) => setPriceValue(e.target.value)}
                        />
                    </TabPane>
                </TabContent>
                <Button size="lg" onClick={handleContinue} className="depositButton w-100 mt-3 justify-content-center">
                    Continue
                </Button>
            </ModalBody>
            {/* Custom Styles */}
            <style>
                {`
                h5.modal-title{
                width: 100%;
                }
                .tab-link {
                    width: 100%;
                    padding: 10px 0;
                    font-size: 16px;
                    font-weight: 500;
                    text-align: center;
                    color: white;
                    border-bottom: 3px solid transparent;
                    transition: all 0.3s ease;
                }
                .tab-link.active {
                    color: #1e90ff !important;
                    border-bottom: 3px solid #1e90ff !important;
                    background-color:transparent !important;
                    border-top:none !important;
                    border-left:none !important;
                    border-right:none !important;
                }
                    .form-control:focus{
                    border-color:#1e90ff !important;
                    }
                `}
            </style>
        </Modal>
    );
};

export default TimePickerModal;

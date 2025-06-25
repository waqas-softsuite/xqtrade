import React, { useEffect } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../../rtk/slices/MarketAndEventsSlice/GetEventsSlice";
import { useTranslation } from 'react-i18next';

const Events = () => {
    const { t } = useTranslation();
    const link = 'https://www.google.com';
    const dispatch = useDispatch();
    const { events, isLoading, isError } = useSelector((state) => state.events);

    const stripHtml = (htmlString) => {
        const div = document.createElement("div");
        div.innerHTML = htmlString;
        return div.textContent || div.innerText || "";
    };

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    // useEffect(() => {
    //     if (link) {
    //         setTimeout(() => {
    //             window.open(link, '_blank'); // Opens in a new tab
    //         }, 5000); // Delay for 5 seconds

    //     }
    // }, [link]);

    const eventsBg = require('../../../assets/images/event-card.jpeg')
    return (
        <div className="page-content">
            <Container fluid  >

                <h5 style={{ fontSize: "20px", fontWeight: "bold", color: "white", marginBottom: "10px" }}>{t('Events')}</h5>

                {isLoading && <p className="text-white">{t('Loading events')}...</p>}
                {isError && <p className="text-danger">{t("Failed to load events data.")}</p>}

                {!isLoading && !isError && events?.length > 0 && (
                    events.map((event, index) => (
                        <Card style={{ minHeight: "256px", position: 'relative', backgroundColor: "black", borderRadius: '12px' }}>
                            <CardBody>
                                <img src={event.image_path} alt="market.name" loading="lazy"
                                    style={{ position: 'absolute', width: '100%', left: '0', top: '0', zIndex: '0', maxHeight: '100%' }}
                                />
                                {/* Top Section: Status & Clock Icon */}
                                <div className="d-flex justify-content-between align-items-center flex-column h-100">
                                    <div className="d-flex justify-content-between align-items-center w-100 position-relative" style={{ zIndex: '999', }}>
                                        <span style={{ fontSize: "12px", fontWeight: "bold", padding: "4px 8px", borderRadius: "4px" }}>
                                            {t('HAPPENING NOW')}
                                        </span>
                                        <i className="ri-time-line" style={{ fontSize: "20px", color: "white" }}></i>
                                    </div>

                                    <div className="w-100 position-relative" style={{ zIndex: '999', }}>
                                        <h4 style={{ fontSize: "25px", fontWeight: "bold", margin: "60px 0 15px" }}>{t(event.name)}</h4>
                                        <div className="d-flex justify-content-between align-items-center w-100">
                                            {/* <p
                                                style={{ fontSize: "12px", fontWeight: "bold" }}
                                                dangerouslySetInnerHTML={{ __html: t(event.description) }}
                                            /> */}
                                            {t(stripHtml(event.description))}
                                            {/* <i className="ri-arrow-right-line"></i> */}
                                        </div>
                                    </div>
                                    {/* Event Title */}

                                    {/* End Date */}



                                </div>
                            </CardBody>
                        </Card>
                    ))
                )}
            </Container>
        </div>
    );
};

export default Events;

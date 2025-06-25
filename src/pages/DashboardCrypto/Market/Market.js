import React, { useEffect } from "react";
import { Container, Card, CardBody } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { fetchMarkets } from "../../../rtk/slices/MarketAndEventsSlice/GetMarketSlice";
import { Spinner, Alert } from "reactstrap";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import images correctly
import eventsBg1 from "../../../assets/images/market-status-1.png";
import eventsBg2 from "../../../assets/images/market-status-2.png";
import eventsBg3 from "../../../assets/images/market-status-3.png";
import eventsBg4 from "../../../assets/images/market-status-4.png";
import eventsBg5 from "../../../assets/images/regulation_bg_tablet.webp";
import eventsBg6 from "../../../assets/images/what_is_ot_preview-1.webp";

import swiperSLide1 from "../../../assets/images/Purple Dark Blue Modern Professional Stocks Trader Linkedin Banner.png";
import swiperSLide2 from "../../../assets/images/Purple Creative Finance LinkedIn Banner.png";
import swiperSLide3 from "../../../assets/images/Yellow and Blue Bold Marketing Agency with Hexagon Frame LinkedIn Banner.png";
import TradingViewTimeline from "./TradingViewTimeline ";
import TradingViewHeatmap from "./TradingViewHeatmap";
import { useTranslation } from 'react-i18next';
const swiperData = [
  { image: swiperSLide1 },
  { image: swiperSLide2 },
  { image: swiperSLide3 },
];

const Market = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const { markets, marketImages, isLoading, isError } = useSelector((state) => state.markets);

  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };


  useEffect(() => {
    dispatch(fetchMarkets());
  }, [dispatch]);

  console.log('marketImages:', marketImages);

  // const { t } = useTranslation();
  return (
    <div className="page-content">
      <Container fluid>
        <h5 style={{ fontSize: "20px", fontWeight: "bold", color: "white", marginBottom: "10px" }}>
          {t('Market')}
        </h5>

        {/* Swiper Carousel */}
        <Swiper
          className="swiper-container mySwiper-4 mb-2"
          speed={1500}
          slidesPerView={1}
          spaceBetween={10}
          autoplay={marketImages.length > 1 ? { delay: 2000 } : false}
          pagination={{ clickable: true }}
          navigation={true}
          loop={marketImages.length > 2} // Enable loop only if more than 2
          loopAdditionalSlides={3}
          modules={[Navigation, Pagination, Autoplay]}
          breakpoints={{
            600: { slidesPerView: 1.5, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 10 },
            1024: { slidesPerView: 2, spaceBetween: 20 },
            1200: { slidesPerView: 2, spaceBetween: 20 },
          }}
        >
          {marketImages.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img.image_path}
                alt={`Market Slide ${index + 1}`}
                className="img-fluid rounded"
              />
            </SwiperSlide>
          ))}
        </Swiper>


        {!isLoading && !isError && markets.length > 0 && (
          <ul className="GDCGDytT">
            {markets.map((market, index) => (
              <li key={index}>
                <button className="HU6cWL4e Po7Vey9N" data-test="mp-category-card">
                  <img
                    src={market.image_path}
                    alt={market.name}
                    className="ZOoprvB1 i2F3lBTa uvhObgnn"
                    loading="lazy"
                  />
                  <div className="BBSp5Isy">
                    <h5 className="_44tV67dU25" data-align="start" data-size="L" data-style="Bold" data-test="Text">
                      {t(market.name)}
                    </h5>
                    {/* <p className="_44tV67dU25" data-align="start" data-size="M Compact" data-style="Regular" data-test="Text"
                      dangerouslySetInnerHTML={{ __html: market.description }}
                    /> */}

                    <p
                      className="_44tV67dU25"
                      data-align="start"
                      data-size="M Compact"
                      data-style="Regular"
                      data-test="Text"
                      dangerouslySetInnerHTML={{
                        __html: t(
                          stripHtmlTags(market.description).trim()
                        )
                      }}
                    />


                  </div>
                </button>
              </li>
            ))}
          </ul>
        )
        }

        {/* Show Loader or Error Message */}
        {isLoading && <p className="text-white">{t('Loading markets')}...</p>}
        {isError && <p className="text-danger">{t('Failed to load market data.')}</p>}




      </Container >

    </div>
  );
};

export default Market;

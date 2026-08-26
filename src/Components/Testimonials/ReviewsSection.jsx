import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

const reviews = [
  {
    name: "Aisha Karim",
    rating: 5,
    initials: "AK",
    color: "#062A4D",
    text: "NBT made our Hunza trip absolutely magical! Everything from the hotels to the guided tours was perfectly organized. The valley was breathtaking beyond words.",
  },
  {
    name: "Stefan Müller",
    rating: 5,
    initials: "SM",
    color: "#F5A623",
    text: "As a solo traveller visiting Northern Pakistan for the first time, I was nervous. NBT completely changed my perspective — safe, professional, and incredibly well-planned from start to finish.",
  },
  {
    name: "Ahmed Raza",
    rating: 5,
    initials: "AR",
    color: "#65ADD4",
    text: "Skardu trip with NBT was the best family vacation we have ever had. The team handled everything smoothly, and the kids loved every single moment of it!",
  },
  {
    name: "Lim Wei Jie",
    rating: 5,
    initials: "LW",
    color: "#062A4D",
    text: "The attention to detail is remarkable. From the airport pickup to the farewell dinner, every step felt personal and warm. Will definitely book again next year!",
  },
  {
    name: "Sophie Laurent",
    rating: 5,
    initials: "SL",
    color: "#F5A623",
    text: "I travelled to Gilgit-Baltistan with NBT and it was truly life-changing. The landscapes are unreal, and their local guides know every hidden gem in the mountains.",
  },
  {
    name: "Fatima Zahra",
    rating: 5,
    initials: "FZ",
    color: "#65ADD4",
    text: "NBT gave us the most affordable yet premium experience in Hunza. The food, the views, the hospitality — everything exceeded our expectations by a mile.",
  },
  {
    name: "Tan Mei Ling",
    rating: 5,
    initials: "TM",
    color: "#062A4D",
    text: "Beautiful trip to Fairy Meadows! The hike was challenging but NBT's guides made it enjoyable and safe. The views from the top were absolutely worth every step.",
  },
  {
    name: "James Harrison",
    rating: 5,
    initials: "JH",
    color: "#F5A623",
    text: "Northern Pakistan is an absolute hidden treasure. NBT's team was professional, friendly, and deeply knowledgeable about the region. Best travel decision I ever made.",
  },
  {
    name: "Hassan Ali Khan",
    rating: 5,
    initials: "HK",
    color: "#65ADD4",
    text: "I have used many travel services in Pakistan, but NBT truly stands out. Their planning, pricing, and customer support are on an entirely different level.",
  },
  {
    name: "Nurul Aisyah",
    rating: 5,
    initials: "NA",
    color: "#062A4D",
    text: "The Naran-Kaghan valley tour was a dream come true. NBT arranged everything so perfectly that we just had to sit back and enjoy the stunning scenery.",
  },
  {
    name: "Marco Rossi",
    rating: 5,
    initials: "MR",
    color: "#F5A623",
    text: "I have trekked in the Alps and Andes, but the Karakoram trek arranged by NBT was the most thrilling experience of my entire life. Absolutely world-class!",
  },
  {
    name: "Zainab Fatima",
    rating: 5,
    initials: "ZF",
    color: "#65ADD4",
    text: "My husband and I booked our honeymoon trip through NBT. They curated the most romantic itinerary with stunning viewpoints and cosy mountain stays.",
  },
  {
    name: "Nurul Izzah",
    rating: 5,
    initials: "NI",
    color: "#062A4D",
    text: "From the moment we landed to the moment we left, NBT handled every detail brilliantly. The team truly cares about their guests and it shows in everything they do.",
  },
  {
    name: "Erik Johansson",
    rating: 5,
    initials: "EJ",
    color: "#F5A623",
    text: "The hospitality in Northern Pakistan surprised me in the best way possible. NBT connected us with local families and culture in a way no guidebook ever could.",
  },
  {
    name: "Bilal Shah",
    rating: 5,
    initials: "BS",
    color: "#65ADD4",
    text: "Took my parents on the Deosai Plains tour with NBT. The team was incredibly patient and caring with elderly travellers. The stunning plateau left us all speechless.",
  },
  {
    name: "Chong Mei Hui",
    rating: 5,
    initials: "CM",
    color: "#062A4D",
    text: "Great value for money! NBT offered us a complete package with hotels, transport, and guided tours all included. The Attabad Lake visit was the highlight of our entire trip.",
  },
  {
    name: "Pierre Dubois",
    rating: 5,
    initials: "PD",
    color: "#F5A623",
    text: "Northern Pakistan reminded me of the Swiss Alps but completely untouched and raw. NBT's expertise in this region is unmatched. Every single recommendation was spot on.",
  },
  {
    name: "Omar Farooq",
    rating: 5,
    initials: "OF",
    color: "#65ADD4",
    text: "Third time booking with NBT and they never disappoint. Their consistency and quality of service keep bringing me back. Truly the best travel company in Pakistan.",
  },
  {
    name: "Priya Menon",
    rating: 5,
    initials: "PM",
    color: "#062A4D",
    text: "The Phander Valley trip was pure magic. Waking up to snow-capped mountains and crystal-clear lakes — NBT made this once-in-a-lifetime memory possible for us.",
  },
  {
    name: "Lars van den Berg",
    rating: 5,
    initials: "LV",
    color: "#F5A623",
    text: "Cycled through the Karakoram Highway with NBT's support team following us the whole way. The organisation was flawless and the adventure was beyond anything I imagined!",
  },
];

function ReviewsSection() {
  return (
    <section
      className="reviews-section overflow-hidden"
      style={{
        padding: "100px 0 120px",
        background: "#F2E3E0",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-60px",
          right: "-60px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(6,42,77,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-40px",
          left: "-40px",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container">
        <div
          className="text-center"
          style={{ marginBottom: "60px", position: "relative", zIndex: 2 }}
        >
          <span
            className="sub-title"
            style={{ color: "#F5A623", fontSize: "18px" }}
          >
            Testimonials
          </span>
          <h2
            className="sub-title style1 "
            style={{ color: "#062A4D", marginTop: "8px" }}
          >
            What Our Travellers Say
          </h2>
          <p
            style={{
              color: "#6E7070",
              maxWidth: "520px",
              margin: "12px auto 0",
              fontSize: "16px",
              lineHeight: 1.6,
            }}
          >
            Real stories from adventurers who explored Pakistan with us
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, FreeMode]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          spaceBetween={28}
          loop={true}
          freeMode={{
            enabled: true,
            momentum: true,
            momentumRatio: 0.2,
          }}
          speed={800}
          breakpoints={{
            0: { slidesPerView: 1 },
            576: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 2.5 },
            1200: { slidesPerView: 3 },
          }}
          style={{ padding: "10px 0 50px", position: "relative", zIndex: 2 }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div
                className="review-card-item"
                style={{
                  background: "#ffffff",
                  borderRadius: "24px",
                  padding: "0",
                  position: "relative",
                  overflow: "hidden",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 4px 24px rgba(21,29,74,0.06)",
                  transition:
                    "transform 0.35s cubic-bezier(.4,0,.2,1), box-shadow 0.35s cubic-bezier(.4,0,.2,1)",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 50px rgba(21,29,74,0.14)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 24px rgba(21,29,74,0.06)";
                }}
              >
                <div
                  style={{
                    height: "4px",
                    background: `linear-gradient(90deg, ${review.color}, ${review.color}88)`,
                  }}
                />

                <div style={{ padding: "32px 30px 36px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      fontSize: "56px",
                      fontFamily: "Georgia, serif",
                      lineHeight: 1,
                      color: "#062A4D",
                      opacity: 0.18,
                      marginBottom: "-4px",
                      userSelect: "none",
                    }}
                  >
                    &#10077;
                  </div>

                  <p
                    style={{
                      margin: 0,
                      fontSize: "15.5px",
                      lineHeight: 1.75,
                      color: "#4A4D52",
                      fontFamily: "Inter, sans-serif",
                      fontStyle: "italic",
                      flex: 1,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {review.text}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      marginTop: "24px",
                      paddingTop: "20px",
                      borderTop: "1px solid #F0F2F4",
                    }}
                  >
                    <div
                      style={{
                        width: "46px",
                        height: "46px",
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${review.color}, ${review.color}cc)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          color: "#fff",
                          fontSize: "15px",
                          fontWeight: 700,
                          fontFamily: "Manrope, sans-serif",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {review.initials}
                      </span>
                    </div>
                    <div>
                      <h4
                        style={{
                          margin: 0,
                          fontSize: "16px",
                          fontWeight: 700,
                          color: "#062A4D",
                          fontFamily: "Manrope, sans-serif",
                        }}
                      >
                        {review.name}
                      </h4>
                      <div
                        style={{
                          display: "flex",
                          gap: "3px",
                          marginTop: "4px",
                        }}
                      >
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className="fa-solid fa-star"
                            style={{
                              color:
                                i < review.rating ? "#F5A623" : "#E1E4E5",
                              fontSize: "12px",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default ReviewsSection;

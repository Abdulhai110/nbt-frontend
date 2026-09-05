import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

const reviews = [
  {
    name: "Aisha Karim",
    rating: 4.8,
    initials: "AK",
    color: "#062A4D",
    text: "We had such a lovely time in Hunza. The hotel was comfortable, our driver was always on time, and the whole trip felt relaxed.",
  },
  {
    name: "Stefan Müller",
    rating: 4.6,
    initials: "SM",
    color: "#F5A623",
    text: "It was my first visit to Pakistan and I travelled alone, so I had a few concerns. The NBT team stayed in contact throughout and made everything easy for me.",
  },
  {
    name: "Ahmed Raza",
    rating: 4.9,
    initials: "AR",
    color: "#65ADD4",
    text: "Booked the Skardu package for my family and everyone enjoyed it, especially the kids. There was a small delay on the first day, but the team managed it well.",
  },
  {
    name: "Lim Wei Jie",
    rating: 4.7,
    initials: "LW",
    color: "#062A4D",
    text: "Really appreciated how helpful the staff were. They even adjusted one day of our itinerary when the weather changed. I would happily travel with them again.",
  },
  {
    name: "Sophie Laurent",
    rating: 4,
    initials: "SL",
    color: "#F5A623",
    text: "Gilgit-Baltistan was even more beautiful than I expected. Our guide was friendly, knowledgeable and never rushed us when we wanted to stop for photos.",
  },
  {
    name: "Fatima Zahra",
    rating: 4.8,
    initials: "FZ",
    color: "#65ADD4",
    text: "The Hunza tour was reasonably priced and very well managed. We particularly enjoyed the local food and the view from our hotel.",
  },
  {
    name: "Tan Mei Ling",
    rating: 4.4,
    initials: "TM",
    color: "#062A4D",
    text: "Fairy Meadows was beautiful, although the journey was tougher than I had imagined. Thankfully, our guide was patient and helped us throughout the hike.",
  },
  {
    name: "James Harrison",
    rating: 4.9,
    initials: "JH",
    color: "#F5A623",
    text: "An unforgettable week in Northern Pakistan. The scenery was incredible, but what I liked most was how welcoming and easy-going the team was.",
  },
  {
    name: "Hassan Ali Khan",
    rating: 4.6,
    initials: "HK",
    color: "#65ADD4",
    text: "I have booked trips with several local companies, and NBT is definitely among the better ones. Clear communication, fair pricing and no last-minute surprises.",
  },
  {
    name: "Nurul Aisyah",
    rating: 4.7,
    initials: "NA",
    color: "#062A4D",
    text: "Our Naran and Kaghan trip went smoothly from beginning to end. The vehicle was clean, the driver was polite, and all the main stops were covered.",
  },
  {
    name: "Marco Rossi",
    rating: 4.8,
    initials: "MR",
    color: "#F5A623",
    text: "The Karakoram trek was demanding but absolutely worth it. The support crew knew the route well and made sure we had enough time to rest.",
  },
  {
    name: "Zainab Fatima",
    rating: 4.9,
    initials: "ZF",
    color: "#65ADD4",
    text: "We chose NBT for our honeymoon and loved the itinerary they prepared. The mountain resort and private dinner were especially memorable.",
  },
  {
    name: "Nurul Izzah",
    rating: 4.5,
    initials: "NI",
    color: "#062A4D",
    text: "Good service overall. A couple of travel days were quite long, but the team kept checking on us and made regular stops whenever we needed them.",
  },
  {
    name: "Erik Johansson",
    rating: 4,
    initials: "EJ",
    color: "#F5A623",
    text: "I came for the mountains but ended up enjoying the people and local culture just as much. Our guide made the experience feel genuine rather than overly touristy.",
  },
  {
    name: "Bilal Shah",
    rating: 4.8,
    initials: "BS",
    color: "#65ADD4",
    text: "I travelled to Deosai with my parents, and the staff were very considerate of their age. They arranged comfortable stops and never made us feel hurried.",
  },
  {
    name: "Chong Mei Hui",
    rating: 4.3,
    initials: "CM",
    color: "#062A4D",
    text: "The package offered good value and included nearly everything we needed. Attabad Lake was easily my favourite part of the holiday.",
  },
  {
    name: "Pierre Dubois",
    rating: 4,
    initials: "PD",
    color: "#F5A623",
    text: "The landscapes are wild and peaceful, unlike most crowded mountain destinations in Europe. NBT selected some excellent places that I would not have found myself.",
  },
  {
    name: "Omar Farooq",
    rating: 4.9,
    initials: "OF",
    color: "#65ADD4",
    text: "This was my third booking with NBT. Service has remained reliable every time, which is the main reason I continue to travel with them.",
  },
  {
    name: "Priya Menon",
    rating: 4.4,
    initials: "PM",
    color: "#062A4D",
    text: "Phander Valley was quiet, beautiful and exactly what we were looking for. The accommodation was simple, but the location and views more than made up for it.",
  },
  {
    name: "Lars van den Berg",
    rating: 4.7,
    initials: "LV",
    color: "#F5A623",
    text: "Cycling along the Karakoram Highway was a fantastic challenge. Having the NBT support vehicle nearby gave us confidence, particularly on the more isolated sections.",
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

// src/Components/Tour/TourInner.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TourCard from "./TourCard";
import { ENV } from "../../../src/env/environment";
import FilterPills from "../FilterPills/FilterPills";

function TourInner({ typeSlug }) {
  const [activeTab, setActiveTab] = useState("tab-grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [tours, setTours] = useState([]);
  const [pricingCategories, setPricingCategories] = useState([]);

  // Fetch pricing categories once, for the filter dropdown
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${ENV.BASE_URL}/public/pricing-categories`);
        const data = await res.json();
        setPricingCategories(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        console.error("Error fetching pricing categories:", err);
      }
    })();
  }, []);

  const fetchTours = async () => {
    try {
      setLoading(true);

      let apiUrl = `${ENV.BASE_URL}/public/tours?search=${search}&page=${currentPage}&limit=${ENV.paginationLimit}`;
      if (typeSlug) apiUrl += `&type=${encodeURIComponent(typeSlug)}`;
      if (categorySlug)
        apiUrl += `&category=${encodeURIComponent(categorySlug)}`;

      const res = await fetch(apiUrl);
      const data = await res.json();

      setTours(Array.isArray(data.data) ? data.data : []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching tours:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      fetchTours();
    }, 600);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setCurrentPage(1);
    fetchTours();
  }, [typeSlug, categorySlug]);

  useEffect(() => {
    fetchTours();
  }, [currentPage]);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <section className="space">
      <div className="container shape-mockup-wrap">
        <div className="th-sort-bar">
          <div className="row justify-content-between align-items-center gy-3">
            <div className="col-md-4">
              <div className="search-form-area">
                <form
                  className="search-form"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button type="submit">
                    <i className="fa-light fa-magnifying-glass" />
                  </button>
                </form>
              </div>
            </div>

            {/* ── Pricing category filter ── */}
            {/* {pricingCategories.length > 0 && (
              <div className="col-md-auto">
                <select
                  className="form-select"
                  value={categorySlug}
                  onChange={(e) => setCategorySlug(e.target.value)}
                  style={{
                    padding: "10px 16px",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    minWidth: "200px",
                  }}
                >
                  <option value="">All Categories</option>
                  {pricingCategories.map((cat) => (
                    <option key={cat._id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            )} */}
            {pricingCategories.length > 0 && (
              <div className="col-12">
                <FilterPills
                  options={pricingCategories.map((c) => ({
                    value: c.slug,
                    label: c.name,
                  }))}
                  activeValue={categorySlug}
                  onChange={setCategorySlug}
                />
              </div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-xxl-12 col-lg-12">
            {loading ? (
              <div className="text-center py-5">Loading tours…</div>
            ) : tours.length === 0 ? (
              <div className="text-center py-5">
                <p>No tours found for this selection.</p>
              </div>
            ) : (
              <div className="tab-content" id="nav-tabContent">
                <div
                  className={`tab-pane fade ${activeTab === "tab-grid" ? "show active" : ""}`}
                  id="tab-grid"
                  role="tabpanel"
                >
                  <div className="row gy-24 gx-24">
                    {tours.map((data, index) => (
                      <div key={data._id || index} className="col-md-4">
                        <TourCard
                          tourID={data._id}
                          tourImage={`${data.coverImage}`}
                          tourTitle={data.title}
                          tourPrice={data.price}
                          index={index}
                          duration={data.duration || 0}
                          groupSize={data.groupSize || 0}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="th-pagination text-center mt-60">
                  <ul>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li key={i}>
                        <Link
                          className={currentPage === i + 1 ? "active" : ""}
                          to="#"
                          onClick={() => handlePageChange(i + 1)}
                        >
                          {i + 1}
                        </Link>
                      </li>
                    ))}
                    {currentPage < totalPages && (
                      <li>
                        <Link
                          className="next-page"
                          to="#"
                          onClick={() => handlePageChange(currentPage + 1)}
                        >
                          Next{" "}
                          <img src="/assets/img/icon/arrow-right4.svg" alt="" />
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className="shape-mockup shape1 d-none d-xxl-block"
          style={{ bottom: "7%", right: "-8%" }}
        >
          <img src="/assets/img/shape/shape_1.png" alt="shape" />
        </div>
        <div
          className="shape-mockup shape2 d-none d-xl-block"
          style={{ bottom: "1%", right: "-7%" }}
        >
          <img src="/assets/img/shape/shape_2.png" alt="shape" />
        </div>
        <div
          className="shape-mockup shape3 d-none d-xxl-block"
          style={{ bottom: "-2%", right: "-12%" }}
        >
          <img src="/assets/img/shape/shape_3.png" alt="shape" />
        </div>
      </div>
    </section>
  );
}

export default TourInner;

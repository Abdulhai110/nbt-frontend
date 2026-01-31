import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DestinationCard from "./DestinationCard";
import DestinationCardTwo from "./DestinationCardTwo";
import { ENV } from "../../../src/env/environment";

function DestinationInner() {
  const [activeTab, setActiveTab] = useState("tab-grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [destinations, setDestinations] = useState([]);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      // Fetching from the destinations endpoint with search and pagination params
      const res = await fetch(
        `${ENV.BASE_URL}/public/destinations?search=${search}&page=${currentPage}&limit=${ENV.paginationLimit}`
      );

      const data = await res.json();

      // Adjust these based on your actual API response structure
      setDestinations(data.data || []); 
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching destinations:", err);
    } finally {
      setLoading(false);
    }
  };

  // Effect for Search Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1); // Reset to first page on new search
      fetchDestinations();
    }, 600);

    return () => clearTimeout(timer);
  }, [search]);

  // Effect for Page Change
  useEffect(() => {
    fetchDestinations();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <section className="space">
      <div className="container">
        <div className="th-sort-bar">
          <div className="row justify-content-between align-items-center">
            <div className="col-md-4">
              <div className="search-form-area">
                <form className="search-form" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    placeholder="Search Destination..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button type="submit">
                    <i className="fa-light fa-magnifying-glass" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xxl-12">
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : (
              <div className="tab-content" id="nav-tabContent">
                {/* Grid View */}
                <div
                  className={`tab-pane fade ${activeTab === "tab-grid" ? "show active" : ""}`}
                  id="tab-grid"
                  role="tabpanel"
                >
                  <div className="row gy-30">
                    {destinations.length > 0 ? (
                      destinations.map((data, index) => (
                        <div key={data._id || index} className="col-xxl-3 col-xl-4 col-md-6">
                          <DestinationCard
                            destinationID={data._id}
                            destinationImage={data.coverImage}
                            destinationTitle={data.name}
                            destinationPrice={data.location}
                          />
                        </div>
                      ))
                    ) : (
                      <p className="text-center">No destinations found.</p>
                    )}
                  </div>
                </div>

                {/* List View */}
                <div
                  className={`tab-pane fade ${activeTab === "tab-list" ? "show active" : ""}`}
                  id="tab-list"
                  role="tabpanel"
                >
                  <div className="row gy-30">
                    {destinations.map((data, index) => (
                      <div key={data._id || index} className="col-12">
                        <DestinationCardTwo
                          destinationID={data._id}
                          destinationImage={data.image}
                          destinationTitle={data.title}
                          destinationPrice={data.price}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Pagination Component */}
            {totalPages > 1 && (
              <div className="th-pagination text-center mt-60 mb-0">
                <ul>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li key={i}>
                      <Link
                        className={currentPage === i + 1 ? "active" : ""}
                        to="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(i + 1);
                        }}
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
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(currentPage + 1);
                        }}
                      >
                        Next{" "}
                        <img src="/assets/img/icon/arrow-right4.svg" alt="" />
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DestinationInner;
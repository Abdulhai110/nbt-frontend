// src/Components/Hero/HeroButtons.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ENV } from "../../env/environment";

function HeroButtons() {
  const [tourTypes, setTourTypes] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${ENV.BASE_URL}/public/tour-types`);
        const data = await res.json();
        setTourTypes(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        console.error("Error fetching tour types:", err);
      }
    })();
  }, []);

  if (!tourTypes.length) return null;

  return (
    <div className="flex flex-wrap gap-4">
      {tourTypes.map((type, index) => (
        <Link
          key={type._id}
          to={`/tours/${type.slug}`}
          className={`th-btn th-icon transition-all duration-300 ${
            type.style || (index % 2 === 0 ? "" : "style2")
          }`}
        >
          {type.name}
        </Link>
      ))}
    </div>
  );
}

export default HeroButtons;
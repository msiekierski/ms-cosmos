import React, { useState } from "react";
import { useAppContext } from "../context";
import "../Link/link.css";

const Link = ({ title }) => {
  const { openModal } = useAppContext();
  const [isHover, setIsHover] = useState(false);

  if (isHover) {
    return (
      <div
        className={`box ${title.toLowerCase()}-img`}
        onClick={() => openModal(title)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="box-overlay">
          <h2 className={`link-title-hover`}>{title}</h2>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`box ${title.toLowerCase()}-img ${
          isHover ? "box-overlay" : ""
        }`}
        onClick={() => openModal(title)}
        onMouseEnter={() => setIsHover(true)}
      >
        <h2 className={`link-title`}>{title}</h2>
      </div>
    );
  }
};

export default Link;

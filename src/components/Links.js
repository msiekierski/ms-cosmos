import React from "react";
import { CAPSULES, CREW, ROCKETS, STARLINK } from "../constants/titles";
import "../index.css";
import Link from "./Link";

const Links = () => {
  return (
    <div className="links-container">
      <Link title={CAPSULES} />
      <Link title={CREW} />
      <Link title={ROCKETS} />
      <Link title={STARLINK} />
    </div>
  );
};

export default Links;

import React from "react";
import { tilesList } from "../constants/titles";
import "../index.css";
import Link from "./Link/Link";
import styled from "styled-components";

const Links = () => {
  return (
    <LinksContainer>
      {tilesList.map((name, index) => {
        return <Link key={index} title={name} />;
      })}
    </LinksContainer>
  );
};

const LinksContainer = styled.div`
  height: 58.3%;
  width: 24.3%;
  margin-left: 16.25rem;
  margin-top: 6.25rem;
  background-color: #221b3a;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1.875rem;
  grid-row-gap: 2rem;
  z-index: 3;
`;

export default Links;

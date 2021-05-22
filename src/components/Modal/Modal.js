import React, { useState } from "react";
import CloseIcon from "../../resources/Icons/CloseIcon";
import "../Modal/modal.css";
import { useAppContext } from "../context";
import ArrowsIcon from "../../resources/Icons/ArrowsIcon";
import styled from "styled-components";
import { CAPSULES, CREW, ROCKETS, STARLINK } from "../../constants/titles";
import ArrowUpIcon from "../../resources/Icons/ArrowUpIcon";
import ArrowDownIcon from "../../resources/Icons/ArrowDownIcon";
import ModalTable from "./ModalTable";

const Modal = () => {
  const { closeModal, selectedTile, triggerSort, sortCount, isError } =
    useAppContext();
  const [isStatusHover, setStatusHover] = useState(false);
  const [isTypeHover, setTypeHover] = useState(false);

  const { col1Sort, col2Sort } = sortCount;

  const getColumnsNames = () => {
    if (selectedTile === CREW) {
      return { col1: "Name", col2: "Status" };
    } else if (selectedTile === CAPSULES) {
      return { col1: "Type", col2: "Status" };
    } else if (selectedTile === ROCKETS || selectedTile === STARLINK) {
      return { col1: "Name", col2: "Type" };
    }
  };

  return (
    <div className="modal">
      <div className="modal-headline">
        <HeadlineText>{selectedTile}</HeadlineText>
        <div onClick={() => closeModal()}>
          <CloseIcon />
        </div>
      </div>
      <div className="modal-header">
        <div
          className="type"
          onMouseEnter={() => setTypeHover(true)}
          onMouseLeave={() => setTypeHover(false)}
        >
          <TypeText>{getColumnsNames().col1}</TypeText>

          <div className="filters" onClick={() => triggerSort(1)}>
            {col1Sort === 0 && isTypeHover && <ArrowsIcon />}
            {col1Sort === 1 && <ArrowUpIcon />}
            {col1Sort === 2 && <ArrowDownIcon />}
          </div>
        </div>
        <div
          className="status"
          onMouseEnter={() => setStatusHover(true)}
          onMouseLeave={() => setStatusHover(false)}
        >
          <StatusText>{getColumnsNames().col2}</StatusText>
          <div className="filters" onClick={() => triggerSort(2)}>
            {col2Sort === 0 && isStatusHover && <ArrowsIcon />}
            {col2Sort === 1 && <ArrowUpIcon />}
            {col2Sort === 2 && <ArrowDownIcon />}
          </div>
        </div>
      </div>
      {isError && (
        <div className="error-msg">
          <h5>Could not load data</h5>
        </div>
      )}
      {!isError && <ModalTable />}
    </div>
  );
};

const TypeText = styled.div`
  margin-left: 6.5%;
`;
const StatusText = styled.div`
  margin-left: 6.5%;
`;

const HeadlineText = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 1.25rem;
  line-height: 2rem;

  color: #ffffff;
`;

export default Modal;

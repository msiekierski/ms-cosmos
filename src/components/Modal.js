import React, { useRef, useState } from "react";
import CloseIcon from "../resources/Icons/CloseIcon";
import "../index.css";
import { useAppContext } from "./context";
import ArrowsIcon from "../resources/Icons/ArrowsIcon";
import styled from "styled-components";
import BarLoader from "react-spinners/ClipLoader";
import { CAPSULES, CREW, ROCKETS, STARLINK } from "../constants/titles";
import ArrowUpIcon from "../resources/Icons/ArrowUpIcon";
import ArrowDownIcon from "../resources/Icons/ArrowDownIcon";

const Modal = () => {
  const {
    closeModal,
    selectedTile,
    data,
    isLoading,
    triggerSortCol1,
    triggerSortCol2,
    col1Sort,
    col2Sort,
    isError,
  } = useAppContext();
  const [isStatusHover, setStatusHover] = useState(false);
  const [isTypeHover, setTypeHover] = useState(false);
  const [isEndScroll, setIsEndScroll] = useState(false);
  const tableRef = useRef(null);

  const getColumnsNames = () => {
    if (selectedTile === CREW) {
      return { col1: "Name", col2: "Status" };
    } else if (selectedTile === CAPSULES) {
      return { col1: "Type", col2: "Status" };
    } else if (selectedTile === ROCKETS || selectedTile === STARLINK) {
      return { col1: "Name", col2: "Type" };
    }
  };

  const scrollEvent = (e) => {
    let element = e.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      setIsEndScroll(true);
    } else {
      setIsEndScroll(false);
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

          <div className="filters" onClick={() => triggerSortCol1()}>
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
          <div className="filters" onClick={() => triggerSortCol2()}>
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
      {!isError && (
        <div className="table-container">
          {isLoading ? (
            <BarLoader size={150} />
          ) : (
            <>
              {!isEndScroll && <div className="table-overlay"></div>}
              <table>
                <tbody onScroll={scrollEvent} ref={tableRef}>
                  {data.map((record, index) => {
                    return (
                      <tr
                        key={index}
                        className={`${index > 0 ? "tr-next" : ""}`}
                      >
                        <td>
                          <TableText>{record.col1}</TableText>
                        </td>
                        <td>
                          <TableText style={{ marginLeft: "4.44%" }}>
                            {record.col2}
                          </TableText>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const TypeText = styled.div`
  margin-left: 6.5%;
`;
const StatusText = styled.div`
  margin-left: 6.5%;
`;

const TableText = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 0.875rem;
  color: #d2cbe9;
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

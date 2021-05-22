import React, { useRef, useState } from "react";
import { useAppContext } from "../context";
import BarLoader from "react-spinners/ClipLoader";
import styled from "styled-components";
import "../Modal/modal.css";

const ModalTable = () => {
  const { isLoading, data } = useAppContext();
  const tableRef = useRef(null);
  const [isEndScroll, setIsEndScroll] = useState(false);

  const scrollEvent = (e) => {
    let element = e.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      setIsEndScroll(true);
    } else {
      setIsEndScroll(false);
    }
  };
  return (
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
                  <tr key={index} className={`${index > 0 ? "tr-next" : ""}`}>
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
  );
};

const TableText = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 0.875rem;
  color: #d2cbe9;
`;

export default ModalTable;

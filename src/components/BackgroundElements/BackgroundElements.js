import React from "react";
import "../BackgroundElements/background.css";

const BackgroundElements = () => {
  return (
    <>
      {[106, 107, 108, 109, 110].map((number) => {
        return <div key={number} className="path" id={`path${number}`}></div>;
      })}
      <div className="circle" id="circle1">
        <div className="circle-inner" id="inner1"></div>
      </div>
      <div className="circle" id="circle2">
        <div className="circle-inner" id="inner2"></div>
      </div>
      <div className="circle" id="circle3">
        <div className="circle-inner" id="inner3"></div>
      </div>
    </>
  );
};

export default BackgroundElements;

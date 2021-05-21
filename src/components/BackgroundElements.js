import React from "react";

const BackgroundElements = () => {
  return (
    <>
      {[106, 107, 108, 109, 110].map((number) => {
        return <div key={number} className={`path path${number}`}></div>;
      })}
      <div className="circle3">
        <div className="inner3"></div>
      </div>
      <div className="circle1">
        <div className="inner"></div>
      </div>
      <div className="circle2">
        <div className="inner2"></div>
      </div>
    </>
  );
};

export default BackgroundElements;

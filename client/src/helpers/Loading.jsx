import React from "react";
import loadingSvg from "../assets/bouncing-circles.svg";
function Loading() {
  return (
    <div className=" w-full h-full  flex items-center justify-center">
      <img src={loadingSvg}  className="w-20"/>
    </div>
  );
}

export default Loading;

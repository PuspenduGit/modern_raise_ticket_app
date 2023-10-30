import React from "react";

const Status = ({ status }) => {
  return (
    <div className="w-full bg-gray-300 rounded-full h-2.75">
      <div
        className="bg-blue-700 h-2.75 rounded-full"
        style={{ width: `${status}%`, color: "transparent" }}>
        /
      </div>
    </div>
  );
};

export default Status;

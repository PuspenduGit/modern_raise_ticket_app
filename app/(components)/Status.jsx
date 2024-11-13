import React from "react";

const Status = ({ status }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner overflow-hidden">
      <div
        className="h-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-300 ease-in-out"
        style={{ width: `${status}%` }}>
        <span className="flex justify-center text-white text-xs font-semibold">
          {status}%
        </span>
      </div>
    </div>
  );
};

export default Status;

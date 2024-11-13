import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faHourglassHalf,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const StatusDisplay = ({ statusDisplay }) => {
  const statusStyles = (status) => {
    switch (status) {
      case "open":
        return {
          color: "text-green-800",
          bg: "bg-green-100",
          icon: faCircleCheck,
        };
      case "pending":
        return {
          color: "text-yellow-800",
          bg: "bg-yellow-100",
          icon: faHourglassHalf,
        };
      case "closed":
        return {
          color: "text-red-800",
          bg: "bg-red-100",
          icon: faTimesCircle,
        };
      default:
        return {
          color: "text-gray-800",
          bg: "bg-gray-200",
          icon: faTimesCircle,
        };
    }
  };

  const { color, bg, icon } = statusStyles(statusDisplay);

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${color} ${bg} transition-all duration-200`}>
      <FontAwesomeIcon icon={icon} className="mr-1" />
      {statusDisplay.charAt(0).toUpperCase() + statusDisplay.slice(1)}
    </span>
  );
};

export default StatusDisplay;

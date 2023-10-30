import React from 'react'

const StatusDisplay = ({ statusDisplay }) => {

  const statusColor = (status) => {
    let color = "bg-red-300";
    switch (statusDisplay) {
      case "open":
        color = "bg-green-300";
        break;
      case "pending":
        color = "bg-yellow-300";
        break;
      case "closed":
        color = "bg-red-300";
        break;
      default:
        color = "bg-red-300";
    }
    return color;
  }

  return (
    <span className={`inline-block rounded-full px-2 py-1 text-xs font-semibold text-gray-800 ${statusColor(statusDisplay)}`}>
      {statusDisplay}
    </span>
  );
};

export default StatusDisplay
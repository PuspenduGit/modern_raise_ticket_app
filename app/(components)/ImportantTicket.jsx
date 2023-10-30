import {faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ImportantTicket = ({importance}) => {

  var stars = {
    low: 1,
    medium: 2,
    high: 3,
    critical: 4,
  };

  return (
    <div className="flex justify-start align-baseline">
      {[...Array(stars[importance])].map((i) => {
        return (
          <FontAwesomeIcon
            key={i}
            icon={faStar}
            className="text-yellow-500 mr-1"
          />
        );
      })}
    </div>
  );
};

export default ImportantTicket;

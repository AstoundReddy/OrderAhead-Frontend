import React, { useEffect, useState } from "react";
import { getRestaurantStatus } from "../../helper/getRestaurantStatus";

const RestaurantStatus = ({ hoursOfOperation }) => {
  const [status, setStatus] = useState("");
  let statusColor;
  switch (status) {
    case "Open":
      statusColor = "text-green-700";
      break;
    case "Closes soon":
      statusColor = "text-yellow-700";
      break;
    case "Opens soon":
      statusColor = "text-yellow-700";
      break;
    case "Closed":
      statusColor = "text-red-700";
      break;
    default:
      statusColor = "text-gray-700";
  }
  useEffect(() => {
    setStatus(getRestaurantStatus(hoursOfOperation));
  }, [hoursOfOperation]);

  return <p className={`text-xl font-bold ${statusColor}`}>{status}</p>;
};

export default RestaurantStatus;

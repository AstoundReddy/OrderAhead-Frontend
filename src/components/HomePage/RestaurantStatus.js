import React, { useEffect, useState } from "react";

const RestaurantStatus = ({ hoursOfOperation }) => {
  const [status, setStatus] = useState("");
  let statusColor;
  switch (status) {
    case "Open":
      statusColor = "text-green-500";
      break;
    case "Closes soon":
      statusColor = "text-yellow-500";
      break;
    case "Opens soon":
      statusColor = "text-yellow-500";
      break;
    case "Closed":
      statusColor = "text-red-500";
      break;
    default:
      statusColor = "text-gray-500";
  }
  useEffect(() => {
    const periods = hoursOfOperation.split(",").map((period) =>
      period.split("-").map((time) => {
        const [hours, minutes] = time.split(":");
        return hours * 60 + +minutes;
      })
    );

    const now = new Date();
    const nowInMinutes = now.getHours() * 60 + now.getMinutes();

    for (const [start, end] of periods) {
      if (nowInMinutes < start) {
        if (start - nowInMinutes <= 30) {
          setStatus("Opens soon");
        } else {
          setStatus("Closed");
        }
        return;
      } else if (nowInMinutes <= end) {
        if (end - nowInMinutes <= 30) {
          setStatus("Closes soon");
        } else {
          setStatus("Open");
        }
        return;
      }
    }

    setStatus("Closed");
  }, [hoursOfOperation]);

  return <p className={`text-lg font-semibold ${statusColor}`}>{status}</p>;
};

export default RestaurantStatus;

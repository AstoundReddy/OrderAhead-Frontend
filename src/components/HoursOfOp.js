import React from "react";
const HoursOfOperation = ({ timeStamp }) => {
  const sessions = timeStamp?.split(", ").map((session) => {
    const [start, end] = session.split("-");
    return { start, end };
  });

  return (
    <div className="flex justify-center">
      {sessions?.map((session, index) => (
        <div key={index} className="flex items-center  justify-start">
          <span className="px-3  rounded-full">{session.start}</span>
          <span>-</span>
          <span className="px-3  rounded-full">{session.end}</span>
        </div>
      ))}
    </div>
  );
};

export default HoursOfOperation;

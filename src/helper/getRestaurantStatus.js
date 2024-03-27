export const getRestaurantStatus = (hoursOfOperation) => {
  const periods = hoursOfOperation?.split(",")?.map((period) =>
    period.split("-").map((time) => {
      const [hours, minutes] = time?.split(":");
      return hours * 60 + +minutes;
    })
  );

  const now = new Date();
  const nowInMinutes = now.getHours() * 60 + now.getMinutes();

  for (const [start, end] of periods) {
    if (nowInMinutes < start) {
      if (start - nowInMinutes <= 30) {
        return "Opens soon";
      } else {
        return "Closed";
      }
    } else if (nowInMinutes <= end) {
      if (end - nowInMinutes <= 30) {
        return "Closes soon";
      } else {
        return "Open";
      }
    }
  }

  return "Closed";
};

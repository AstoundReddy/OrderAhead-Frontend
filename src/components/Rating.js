function Rating({ rating }) {
  let color;

  if (rating >= 4) {
    color = "text-green-500"; // green for ratings 4 and above
  } else if (rating >= 3) {
    color = "text-yellow-500"; // yellow for ratings 3 and above
  } else {
    color = "text-red-500"; // red for ratings below 3
  }

  return <>{rating > 0 && <div className={`flex mx-2 items-center ${color}`}> ★ {rating}</div>}</>;
}

export default Rating;

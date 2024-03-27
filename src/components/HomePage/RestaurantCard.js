import React from "react";
import { Link } from "react-router-dom";
import Rating from "../Rating";
import RestaurantStatus from "./RestaurantStatus";

const RestaurantCard = ({ restaurant }) => {
  const imageUrl = `https://source.unsplash.com/480x320/?restaurant,${restaurant.restaurantId}`;
  return (
    <Link to={`/restaurant/${restaurant.restaurantId}`}>
      <div className="max-w-sm rounded-md transform transition-transform duration-200 hover:scale-95 overflow-hidden shadow-lg m-2 relative">
        <img className="w-full" src={imageUrl} alt={restaurant.name} />
        <div className="absolute bottom-0 left-0 right-0 text-white p-5" style={{ backgroundImage: "linear-gradient(to top, rgba(0,0,0,1) 20%, rgba(0,0,0,0))" }}>
          <div className="font-bold flex justify-between text-lg md:text-xl mb-1">
            {restaurant.name}
            <div className="flex ">
              <Rating rating={restaurant.averageRating} />
              <p className="self-center">({restaurant.numRatings})</p>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-200 text-base">{restaurant.cuisineType}</p>
            <RestaurantStatus hoursOfOperation={restaurant.hoursOfOperation} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;

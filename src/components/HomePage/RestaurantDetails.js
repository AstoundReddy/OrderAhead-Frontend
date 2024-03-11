import React from "react";
import HoursOfOperation from "../HoursOfOp";

const RestaurantDetails = ({ restaurantDetails }) => {
  <div className="max-w-7xl  mb-6 mx-auto px-4 border-2 sm:px-6 relative">
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('https://broaster.com/wp-content/uploads/BroasterFoods-WideTableGroup-Crop-1024x332.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        zIndex: -1,
        opacity: 0.5,
      }}
    />
    <div className="mt-16 text-center">
      <h1 className="text-4xl tracking-tight font-extrabold text-black sm:text-5xl md:text-6xl">{restaurantDetails.name}</h1>
      <p className=" max-w-md mx-auto text-base text-gray-900 font-semibold  sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        <HoursOfOperation timeStamp={restaurantDetails?.hoursOfOperation} />
        {restaurantDetails.location} | {restaurantDetails.cuisineType} | {restaurantDetails.phoneNumber}
      </p>
      <span className="text-lg font-semibold">
        <span className="text-yellow-500">★</span>
        <span className="ml-1">{restaurantDetails.averageRating || 0}</span>
        <span className="ml-2 text-gray-600">({restaurantDetails.numberOfRatings || 0} ratings)</span>
      </span>
    </div>
  </div>;
};

export default RestaurantDetails;

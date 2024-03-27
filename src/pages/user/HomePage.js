import React, { useContext, useEffect, useState } from "react";
import RestaurantCard from "../../components/HomePage/RestaurantCard";
import { restaurantApi } from "../../api/restaurantApi";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../assets/loading2svg.svg";
import { toast } from "react-toastify";
import { getRestaurantStatus } from "../../helper/getRestaurantStatus";

const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const fetchRestaurants = async () => {
    setIsLoading(true);
    try {
      const restaurants = (await restaurantApi.getAllRestaurants()).data.content;
      setRestaurants(restaurants);
      console.log(restaurants[0]);
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <div className="font-sans text-gray-900 ">
      <div className="relative py-2 border-gray-50 border">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://broaster.com/wp-content/uploads/BroasterFoods-WideTableGroup-Crop-1024x332.jpg')",
            backgroundBlendMode: "multiply",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            zIndex: -1,
            opacity: 0.5,
          }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 ">
          <div className="mt-16 text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block text-black">Skip the Line!</span>
              <span className="block text-indigo-600">Eat your food on Time</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-white sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">Get your meal when you want it, no more waiting</p>
          </div>
        </div>
      </div>

      <div className="mt-10 max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
          {user?.userId ? <span className="block">Hello {user.firstName}, looking for a Restaurant? </span> : <span className="block">Our restaurants </span>}
        </h2>
        {isLoading && (
          <div className="flex justify-center items-center">
            <img src={Loading} className="w-12" alt="Loading" />
          </div>
        )}
        <div className="flex flex-wrap justify-around">
          {restaurants
            .sort((a, b) => {
              if (
                (getRestaurantStatus(a.hoursOfOperation) === "Open" || getRestaurantStatus(a.hoursOfOperation) === "Closes soon") &&
                getRestaurantStatus(b.hoursOfOperation) !== "Open" &&
                getRestaurantStatus(b.hoursOfOperation) !== "Closes soon"
              ) {
                return -1;
              } else {
                return 1;
              }
            })
            .map((restaurant, index) => (
              <RestaurantCard key={index} restaurant={restaurant} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

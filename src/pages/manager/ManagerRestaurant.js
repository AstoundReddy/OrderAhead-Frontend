import React, { useState } from "react";

export default function ManagerRestaurant() {
  const [restaurant, setRestaurant] = useState({
    name: "",
    location: "",
    hoursOfOperation: "",
    cuisineType: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the API to add the restaurant here
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-4xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-20">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center space-x-5">
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">Add Your Restaurant</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">Enter your restaurant details below.</p>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <form onSubmit={handleSubmit} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="grid lg:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="leading-loose text-indigo-500">Restaurant Name</label>
                    <input
                      type="text"
                      name="name"
                      value={restaurant.name}
                      onChange={handleChange}
                      className="px-4 py-2 border focus:ring-yellow-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Bikanervala"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose text-indigo-500">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={restaurant.location}
                      onChange={handleChange}
                      className="px-4 py-2 border focus:ring-yellow-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Delhi"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose text-indigo-500">Hours of Operation</label>
                    <input
                      type="text"
                      name="hoursOfOperation"
                      value={restaurant.hoursOfOperation}
                      onChange={handleChange}
                      className="px-4 py-2 border focus:ring-yellow-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="09:00-22:30"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose text-indigo-500">Cuisine Type</label>
                    <input
                      type="text"
                      name="cuisineType"
                      value={restaurant.cuisineType}
                      onChange={handleChange}
                      className="px-4 py-2 border focus:ring-yellow-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="North Indian, Sweets"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose text-indigo-500">Phone Number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={restaurant.phoneNumber}
                      onChange={handleChange}
                      className="px-4 py-2 border focus:ring-yellow-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="18001021234"
                    />
                  </div>
                </div>
                <button type="submit" className="mt-3 text-center w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50">
                  Add Restaurant
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

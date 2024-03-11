import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { orderApi } from "../../api/orderApi";
import Rating from "../Rating";
import moment from "moment";

function OrderCard({ order, setSelectedOrderId, fetchOrders, setIsModalOpen }) {
  const options = {
    year: "numeric",
    month: "short", // "short" for abbreviated month name.
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Use 12-hour format.
  };
  const statusStyles = {
    PLACED: "bg-yellow-100 text-yellow-800",
    PREPARING: "bg-blue-100 text-blue-800",
    READY_FOR_PICKUP: "bg-green-100 text-green-800",
    DELIVERED: "bg-purple-100 text-purple-800",
    CANCELLED: "bg-red-100 text-red-800",
  };
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const rateItem = async () => {
    try {
      const response = await orderApi.rateOrderById(order.orderId, rating);
      console.log(response);
      fetchOrders();
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-white font-sans rounded-lg shadow-md flex justify-between p-6 mb-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium">Order #{order.orderId}</h2>
          <span className={`text-sm px-3 py-1 rounded-full ${statusStyles[order.orderStatus]}`}>{order.orderStatus}</span>
        </div>
        <div className="mb-4">
          <p className="font-semibold text-lg text-indigo-700 ">{order.restaurant.name}</p>
          <p className="text-gray-600">{order.restaurant.location}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 my-2">
          <div>
            <p className="text-indigo-500">Order Time</p>
            <p>
              {new Date(order.orderDatetime).toLocaleString("en-US", options)}
              <br />
              {moment(order.orderDatetime).fromNow()}
            </p>
          </div>
          <div>
            <p className="text-indigo-500">Total Price</p>
            <p>₹{order.totalPrice}</p>
          </div>
        </div>
        {order.orderStatus === "DELIVERED" && (
          <div className="my-2 text-yellow-600">
            {order.rating === 0 || order.rating == null ? (
              <div className="  flex space-x-2">
                <p className="self-center">Rate your experience:</p>
                <ReactStars value={rating} onChange={(r) => setRating(r)} count={5} size={20} edit={true} />
                <button onClick={rateItem} className={`${rating === 0 && "hidden"} p-2 text-sm mx-2 underline text-yellow-700 hover:text-yellow-600`}>
                  {"Submit"}
                </button>
              </div>
            ) : (
              <p className="font-semibold flex">
                <span> You rated : </span>
                <Rating rating={order.rating} />
              </p>
            )}
          </div>
        )}
        {order.orderStatus === "PREPARING" && (
          <div className="my-2 bg-yellow-200 p-2 rounded">
            <p className="text-indigo-500 font-bold">Pickup Time</p>
            <p className="font-semibold">
              {" "}
              {new Date(order.orderDatetime).toLocaleString("en-US", options)}
              <br />
              {moment(order.orderDatetime).fromNow()}
            </p>
          </div>
        )}
        <button
          onClick={() => {
            setSelectedOrderId(order.orderId);
            setIsModalOpen(true);
          }}
          className="bg-gray-800 hover:bg-gray-500 text-yellow-400 font-medium py-2 px-4 rounded-full w-full text-center">
          View Details
        </button>
      </div>
      <div className="flex w-40 rounded-lg">
        <img src="https://source.unsplash.com/featured/?cafe" className="p-4 rounded" alt={order.restaurant.name} />
      </div>
    </div>
  );
}

export default OrderCard;

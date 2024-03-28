import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { orderApi } from "../../api/orderApi";
import Rating from "../Rating";
import moment from "moment";
import { toast } from "react-toastify";
import Loading from "../../assets/loading2svg.svg";

function OrderCard({ order, setSelectedOrderId, fetchOrders, setIsModalOpen }) {
  const options = {
    timeZone: "Asia/Kolkata",
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
  const rateItem = async () => {
    setIsLoading(true);
    try {
      const response = await orderApi.rateOrderById(order.orderId, rating);
      fetchOrders();
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };
  const imageUrl = `https://source.unsplash.com/320x480/?restaurant,${order.orderId}`;
  return (
    <div className="flex font-sans items-center bg-white rounded-lg shadow-md p-4 ">
      <img src={imageUrl} alt="Order" className="w-16 h-16 rounded-full mr-4" />
      <div className="flex-grow">
        <div className="flex-grow flex flex-row justify-between">
          <div className="pr-4">
            <div className="flex space-x-4">
              <h2 className="text-lg font-semibold">Order #{order.orderId}</h2>
              <span className={`text-sm px-3 py-1 rounded-full ${statusStyles[order.orderStatus]}`}>{order.orderStatus}</span>
            </div>

            <p className="text-sm text-gray-500">{order.restaurant.name}</p>
            <p className="text-sm text-gray-500">{order.restaurant.location}</p>
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
                <p className="font-semibold"> {new Date(order.orderDatetime).toLocaleString("en-IN", options)}</p>
              </div>
            )}
          </div>
          <div className="border-l flex flex-col items-end pl-4">
            <p className="text-sm text-gray-500">Order Time: {new Date(order.orderDatetime + "Z").toLocaleString("en-IN", options)}</p>
            {order?.pickupDatetime && <p className="text-sm text-gray-500">Pickup Time: {new Date(order?.pickupDatetime + "Z").toLocaleString("en-IN", options)}</p>}
            <p className="text-sm text-gray-700 font-semibold">Total Price: ₹{order.totalPrice}</p>

            <button
              onClick={() => {
                setSelectedOrderId(order.orderId);
                setIsModalOpen(true);
              }}
              className="bg-gray-800 hover:bg-gray-500 text-yellow-400 font-medium py-2 px-4 rounded-full mt-2">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;

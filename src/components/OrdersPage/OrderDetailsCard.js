import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { orderApi } from "../../api/orderApi";
import Rating from "../Rating";
import Loading from "../../assets/loading2svg.svg";
import { toast } from "react-toastify";

const OrderDetailsCard = ({ item, selectedOrderStatus, fetchOrderDetails }) => {
  // Your component logic here
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const rateItem = async () => {
    setIsLoading(true);
    try {
      const response = await orderApi.rateItemById(item.orderDetailsId, rating);
      console.log(response);
      fetchOrderDetails();
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div key={item.orderDetailsId} className="mb-4 w-60 bg-white rounded-md p-4 shadow-sm">
      {isLoading && (
        <div className="flex justify-center items-center">
          <img src={Loading} alt="Loading" />
        </div>
      )}
      <div className="flex items-center">
        <img src={item.menuItem.image} alt={item.menuItem.name} className="w-16 h-16 rounded-md mr-4" />
        <div>
          <p className="text-indigo-600 font-medium">{item.menuItem.name}</p>
          <p className="text-gray-600">₹{item.menuItem.price}</p>
        </div>
      </div>
      <p className="text-yellow-600 font-medium ml-20">Qty: {item.quantity}</p>
      {selectedOrderStatus === "DELIVERED" && (
        <div className="my-2 text-yellow-600">
          {item.rating === 0 || item.rating == null ? (
            <div className="  flex space-x-2">
              <p className="self-center">Rate:</p>
              <div className="self-center">
                <ReactStars value={rating} onChange={(r) => setRating(r)} count={5} size={20} edit={true} />
              </div>
              <button onClick={rateItem} className={`${rating === 0 && "hidden"} self-center p-2 text-sm mx-2 underline text-yellow-700 hover:text-yellow-600`}>
                {"Submit"}
              </button>
            </div>
          ) : (
            <p className="font-semibold flex">
              <span> You rated : </span>
              <Rating rating={item.rating} />
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderDetailsCard;

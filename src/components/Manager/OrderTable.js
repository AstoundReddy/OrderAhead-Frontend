import moment from "moment";
import React from "react";
import Rating from "../Rating";
export default function OrderTable({ orders, setSelectedOrderId, showPickupDatetime, showUserRating }) {
  const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "short", // "short" for abbreviated month name.
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Use 12-hour format.
  };
  return (
    <table className="min-w-full divide-y  divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Time</th>
          {showPickupDatetime && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickup Time</th>}
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Items</th>
          {showUserRating && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>}
          {!showUserRating && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>}
        </tr>
      </thead>
      <tbody className="bg-white divide-y font-sans divide-gray-200">
        {orders?.map((order) => (
          <tr key={order.orderId}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order?.orderId}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {order?.user?.firstName}
              <br />
              {order?.user?.phoneNumber}{" "}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {new Date(order.orderDatetime + "Z").toLocaleString("en-IN", options)}
              <br />
              {moment(order.orderDatetime + "Z").fromNow()}
            </td>
            {showPickupDatetime && (
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(order.pickupDatetime + "Z").toLocaleString("en-IN", options)}
                <br />
                {moment(order.pickupDatetime + "Z").fromNow()}
              </td>
            )}
            <td className="px-6 py-4 font-semibold whitespace-nowrap text-sm text-gray-500">{order?.totalPrice}</td>
            <td className="px-6 py-4 font-semibold whitespace-nowrap text-sm text-gray-500">{order?.totalItems}</td>
            {showUserRating && <td className="px-6 py-4 font-semibold whitespace-nowrap text-sm text-gray-500">{order?.rating !== 0 && <Rating rating={order?.rating} />}</td>}
            {!showUserRating && (
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button onClick={() => setSelectedOrderId(order.orderId)} className="text-white p-2 rounded hover:bg-blue-900 bg-blue-300">
                  Handle
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

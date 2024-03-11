import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { orderApi } from "../../api/orderApi";
import OrderDetailsCard from "./OrderDetailsCard";
import ReactModal from "react-modal";

export default function OrderDetailsModal({ orderDetails, selectedOrderStatus, fetchOrderDetails, isModalOpen, setIsModalOpen }) {
  console.log(orderDetails);
  console.log(isModalOpen);
  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      className="absolute max-h-[85vh] overflow-auto p-5 bg-gray-100 rounded shadow-lg max-w-full md:max-w-3xl mx-auto top-20 font-sans font-bold"
      overlayClassName="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
      <button onClick={() => setIsModalOpen(false)} className="absolute right-2 top-2 text-gray-500 hover:text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h2 className="text-xl font-medium mb-4 text-indigo-600">Order Details</h2>
      {orderDetails.map((item, index) => (
        <OrderDetailsCard key={index} fetchOrderDetails={fetchOrderDetails} item={item} selectedOrderStatus={selectedOrderStatus} />
      ))}
    </ReactModal>
  );
}

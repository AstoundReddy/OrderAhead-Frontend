import React, { useState, useEffect, useContext, useCallback } from "react";
import { orderApi } from "../../api/orderApi";
import OrderCard from "../../components/OrdersPage/OrderCard";
import { AuthContext } from "../../context/AuthContext";
import OrderDetailsModal from "../../components/OrdersPage/OrderDetailsModal";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState(null);
  const { user } = useContext(AuthContext);
  const fetchOrders = useCallback(async () => {
    if (!user) return;
    const fetchedOrders = (await orderApi.fetchOrdersByUser(user?.userId)).data;
    setOrders(fetchedOrders);
  }, [user]);
  const fetchOrderDetails = async (orderId) => {
    const fetchedOrderDetails = (await orderApi.fetchOrderDetailsById(orderId)).data;
    setOrderDetails(fetchedOrderDetails);
  };
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  useEffect(() => {
    if (selectedOrderId) fetchOrderDetails(selectedOrderId);
    if (selectedOrderId) {
      const selectedOrder = orders.find((order) => order.orderId === selectedOrderId);
      setSelectedOrderStatus(selectedOrder.orderStatus);
    }
  }, [selectedOrderId, orders]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 pt-6 pb-12 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      <div className="">
        <div className="flex flex-wrap justify-center space-x-2">
          {orders.map((order) => (
            <OrderCard
              fetchOrders={fetchOrders}
              key={order.orderId}
              order={order}
              setSelectedOrderId={setSelectedOrderId}
              setIsModalOpen={setIsModalOpen} // Pass setIsModalOpen to OrderCard
            />
          ))}
        </div>
      </div>
      {isModalOpen && orderDetails && (
        <div>
          <OrderDetailsModal
            orderDetails={orderDetails}
            fetchOrderDetails={() => fetchOrderDetails(selectedOrderId)}
            selectedOrderStatus={selectedOrderStatus}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen} // Pass setIsModalOpen to OrderDetailsModal
          />
        </div>
      )}
    </div>
  );
};

export default OrdersPage;

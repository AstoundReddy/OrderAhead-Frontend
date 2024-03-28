import React, { useState, useEffect, useContext, useCallback } from "react";
import { orderApi } from "../../api/orderApi";
import OrderCard from "../../components/OrdersPage/OrderCard";
import { AuthContext } from "../../context/AuthContext";
import OrderDetailsModal from "../../components/OrdersPage/OrderDetailsModal";
import { toast } from "react-toastify";
import Loading from "../../assets/loading2svg.svg";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const fetchOrders = useCallback(async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const fetchedOrders = (await orderApi.fetchOrdersByUser(user?.userId)).data;
      setOrders(fetchedOrders);
    } catch (error) {
      toast.error("Error fetching orders");
    } finally {
      setIsLoading(false);
    }
  }, [user]);
  const fetchOrderDetails = async (orderId) => {
    try {
      const fetchedOrderDetails = (await orderApi.fetchOrderDetailsById(orderId)).data;
      setOrderDetails(fetchedOrderDetails);
    } catch (error) {
      toast.error("Error fetching order details");
    } finally {
      setIsLoading(false);
    }
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
      {isLoading && (
        <div className="flex justify-center items-center">
          <img src={Loading} className="w-12" alt="Loading" />
        </div>
      )}
      <div className="">
        <div className="space-y-4 flex-col items-center">
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

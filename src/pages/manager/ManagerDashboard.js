import { useContext, useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import OrderTable from "../../components/Manager/OrderTable";
import "react-tabs/style/react-tabs.css";
import { orderApi } from "../../api/orderApi";
import ManagerOrderModal from "../../components/Manager/ManagerOrderModal";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useCallback } from "react";
import Loading from "../../assets/loading2svg.svg";
function ManagerDashboard() {
  const [orders, setOrders] = useState([]);
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const { user } = useContext(AuthContext);
  const handleClose = () => {
    setIsOpen(false);
    setSelectedOrderId(null);
  };
  const fetchSelectedOrderDetails = async (orderId) => {
    setIsLoading(true);
    try {
      const response = await orderApi.fetchOrderDetailsById(orderId);
      setSelectedOrderDetails(response.data);
      setIsOpen(true);
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchOrders = useCallback(
    async (status) => {
      setIsLoading(true);
      if (!user?.restaurantId) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await orderApi.getOrdersByRestaurant(user?.restaurantId, status, 0);
        setOrders(response.data.content);
      } catch (error) {
        toast.error(error.response.data);
      } finally {
        setIsLoading(false);
      }
    },
    [user?.restaurantId]
  );

  useEffect(() => {
    if (index === 0) {
      fetchOrders("PLACED");
    } else if (index === 1) {
      fetchOrders("PREPARING");
    } else if (index === 2) {
      fetchOrders("READY_FOR_PICKUP");
    } else if (index === 3) {
      fetchOrders("DELIVERED");
    }
  }, [index, fetchOrders]);

  useEffect(() => {
    if (selectedOrderId) {
      fetchSelectedOrderDetails(selectedOrderId);
    }
  }, [selectedOrderId]);
  const selectedOrder = orders.find((order) => order.orderId === selectedOrderId);
  return (
    <div className="bg-gray-100 min-h-screen">
      {selectedOrderId && <ManagerOrderModal isOpen={isOpen} orderDetails={selectedOrderDetails} order={selectedOrder} onClose={handleClose} />}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {isLoading && (
          <div className="flex justify-center items-center">
            <img className="w-12" src={Loading} alt="Loading" />
          </div>
        )}
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-gray-800">
            <Tabs selectedIndex={index} onSelect={(index) => setIndex(index)}>
              <TabList className="flex flex-col sm:flex-row bg-gray-800">
                <Tab className="text-gray-500 cursor-pointer rounded-none text-center hover:bg-gray-100 font-medium w-full text-lg border-r-2 border-gray-500 py-2 px-4">Placed Orders</Tab>
                <Tab className="text-gray-500 cursor-pointer rounded-none text-center hover:bg-gray-100 font-medium w-full text-lg border-r-2 border-gray-500 py-2 px-4">Preparing</Tab>
                <Tab className="text-gray-500 cursor-pointer rounded-none text-center hover:bg-gray-100 font-medium w-full text-lg border-r-2 border-gray-500 py-2 px-4">Ready for Pickup</Tab>
                <Tab className="text-gray-500 cursor-pointer rounded-none text-center hover:bg-gray-100 font-medium w-full text-lg py-2 px-4">Delivered Orders</Tab>
              </TabList>
              <div className="relative h-full">
                <TabPanel className="p-2 py-6 absolute inset-0">
                  <div className="overflow-x-auto min-w-screen">
                    <OrderTable orders={orders} setSelectedOrderId={setSelectedOrderId} />
                  </div>
                </TabPanel>
                <TabPanel className="p-2 py-6 absolute inset-0">
                  <div className="overflow-x-auto min-w-screen">
                    <OrderTable orders={orders} setSelectedOrderId={setSelectedOrderId} showPickupDatetime={true} />
                  </div>
                </TabPanel>
                <TabPanel className="p-2 py-6 absolute inset-0">
                  <div className="overflow-x-auto min-w-screen">
                    <OrderTable orders={orders} setSelectedOrderId={setSelectedOrderId} showPickupDatetime={true} />
                  </div>
                </TabPanel>
                <TabPanel className="p-2 py-6 absolute inset-0">
                  <div className="overflow-x-auto min-w-screen">
                    <OrderTable orders={orders} setSelectedOrderId={setSelectedOrderId} showPickupDatetime={true} />
                  </div>
                </TabPanel>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;

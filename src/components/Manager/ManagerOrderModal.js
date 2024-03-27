import Modal from "react-modal";
import Rating from "../Rating";
import { useState } from "react";
import { orderApi } from "../../api/orderApi";
import { toast } from "react-toastify";
import Loading from "../../assets/loading.gif";

Modal.setAppElement("#root"); // replace '#root' with the id of your app's root element

function ManagerOrderModal({ isOpen, order, onClose, orderDetails }) {
  const [status, setStatus] = useState(order?.status);
  const [pickupDateTime, setPickupDateTime] = useState(order?.pickupTime);
  const [isLoading, setIsLoading] = useState(false);

  const handleAccept = async () => {
    setIsLoading(true);
    try {
      await orderApi.updateOrderById(order.orderId, { status, pickupDateTime });
      onClose();
    } catch (error) {
      toast.error(error.respones.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecline = () => {
    onClose();
  };
  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center">
          <img src={Loading} className="w-12" alt="Loading" />
        </div>
      )}
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Order Details"
        className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
        overlayClassName="fixed inset-0 z-10 overflow-y-auto flex items-center bg-black bg-opacity-50 justify-center">
        <button onClick={onClose} className="float-right text-gray-400 hover:text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Order #{order?.orderId}</h3>

        <div className="mt-2">
          <p className="text-sm text-gray-500">Special Instructions: {order?.specialInstructions || "N/A"}</p>
          <div className="flex justify-around">
            <label className=" block mt-4">
              <span className="text-gray-700">Order Status</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 block w-full rounded-md outline-none bg-gray-100 border-transparent focus:border-yellow-500 focus:bg-white focus:ring-0">
                <option value={null}></option>
                <option value="PREPARING">Preparing</option>
                <option value="READY_FOR_PICKUP">Ready for Pickup</option>
                <option value="DELIVERED">Delivered</option>
              </select>
            </label>

            <label className=" block mt-4">
              <span className="text-gray-700">Pickup Time</span>

              <input
                type="datetime-local"
                value={pickupDateTime || order?.pickupDatetime}
                onChange={(e) => setPickupDateTime(e.target.value)}
                className="mt-1 block w-full outline-none rounded-md bg-gray-100 border-transparent focus:border-yellow-500 focus:bg-white focus:ring-0"
              />
            </label>
          </div>
          {orderDetails?.map((detail) => (
            <div key={detail?.orderDetailsId} className="mt-4 border-b">
              <span className="mt-2 flex text-gray-500">
                {detail.menuItem.name}
                {detail.menuItem.rating > 0 && <Rating rating={detail.menuItem.rating} />}
              </span>
              <p className="mt-1 text-sm text-gray-500">Quantity: {detail.quantity}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end space-x-4">
          <button type="button" className="text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg" onClick={handleAccept}>
            Proceed
          </button>
          <button type="button" className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg" onClick={handleDecline}>
            Decline
          </button>
        </div>
      </Modal>
    </>
  );
}

export default ManagerOrderModal;

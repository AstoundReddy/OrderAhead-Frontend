import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactModal from "react-modal";
import { restaurantApi } from "../../api/restaurantApi";
import { orderApi } from "../../api/orderApi";
import HoursOfOperation from "../../components/HoursOfOp";
import { AuthContext } from "../../context/AuthContext";
import MenuItemCard from "../../components/RestaurantPage/MenuItemCard";
import { toast } from "react-toastify";
import Loading from "../../assets/loading2svg.svg";
import RestaurantStatus from "../../components/HomePage/RestaurantStatus";
import { getRestaurantStatus } from "../../helper/getRestaurantStatus";

ReactModal.setAppElement("#root");
const RestaurantPage = () => {
  const { restaurantId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [cart, setCart] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isButtonHighlighted, setIsButtonHighlighted] = useState(false);
  const [restaurantStatus, setRestaurantStatus] = useState("");
  const handlePlusMinusClick = () => {
    setIsButtonHighlighted(true);
    setTimeout(() => setIsButtonHighlighted(false), 500); // Remove highlight after 2 seconds
  };

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleIncrement = useCallback((itemId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [itemId]: (prevCart[itemId] || 0) + 1,
    }));
  }, []);

  const handleDecrement = useCallback((itemId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [itemId]: Math.max((prevCart[itemId] || 0) - 1, 0),
    }));
  }, []);
  const fetchRestaurantById = async (id) => {
    setIsLoading(true);
    try {
      const restaurant = (await restaurantApi.getRestaurantById(id)).data;
      setRestaurantDetails(restaurant);
      setRestaurantStatus(getRestaurantStatus(restaurant.hoursOfOperation));
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };
  const totalPrice = Object.keys(cart)
    .reduce((sum, itemId) => {
      const item = restaurantDetails.menuItems.find((item) => item.itemId === parseInt(itemId));
      return sum + item.price * cart[itemId];
    }, 0)
    .toFixed(2);
  const totalItems = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const mapCart = (cart) => {
    const mappedCart = Object.keys(cart).map((key) => ({
      itemId: Number(key),
      quantity: cart[key],
    }));
    return mappedCart;
  };
  useEffect(() => {
    fetchRestaurantById(restaurantId);
  }, [restaurantId]);

  const postOrder = async () => {
    setIsLoading(true);
    try {
      const response = await orderApi.createOrder({
        userId: user.userId,
        restaurantId: restaurantDetails.restaurantId,
        items: mapCart(cart),
        totalItems,
        totalPrice: parseInt(totalPrice),
        specialInstructions,
      });
      navigate("/");
      console.log(response);
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-sans  text-gray-900 antialiased">
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="relative max-h-[85vh] overflow-auto p-5 bg-gray-100 rounded shadow-lg max-w-full md:max-w-3xl mx-auto top-20 font-sans font-bold">
        <button onClick={() => setIsModalOpen(false)} className="absolute right-2 top-2 text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4 text-yellow-600">Order Details</h2>
        {Object.keys(cart).map((itemId) => {
          const item = restaurantDetails.menuItems.find((item) => item.itemId === parseInt(itemId));
          return (
            <div key={itemId} className="flex max-h-fit overflow-auto items-start justify-between w-full mb-4">
              <img className="w-16 h-16 rounded mr-4" src={item.image} alt={item.name} />
              <div className="flex-1">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p>Price: ₹{item.price}</p>
              </div>
              <div>
                <div className="flex w-20 text-green-600 px-2 text-xl font-bold justify-between items-center mx-2 my-4 border-green-700 rounded-md border-2">
                  <button onClick={() => handleDecrement(item.itemId)} className="self-center  ">
                    -
                  </button>
                  <span className="px-1 self-center border-x-2 border-green-500">{cart[item.itemId] || 0}</span>
                  <button onClick={() => handleIncrement(item.itemId)} className="self-center ">
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <div className="flex">
          <p className="text-yellow-600 self-center">Special Instructions : </p>
          <input className="w-full md:w-auto border-2 mx-2 rounded-md border-gray-400 p-2 self-center" value={specialInstructions} onChange={(e) => setSpecialInstructions(e.target.value)} />
        </div>
        <p className="text-lg font-bold text-yellow-600">Total: ₹{totalPrice}</p>
        <button onClick={postOrder} className="bg-yellow-600 text-white px-4 py-2 rounded mt-4">
          Confirm Order
        </button>
      </ReactModal>
      <div className="max-w-7xl mb-6 mx-auto px-4 border-2 sm:px-6 relative">
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('https://broaster.com/wp-content/uploads/BroasterFoods-WideTableGroup-Crop-1024x332.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            zIndex: -1,
            opacity: 0.5,
          }}
        />
        <div className="mt-16 text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-black sm:text-5xl md:text-6xl">{restaurantDetails.name}</h1>
          <div className=" max-w-md mx-auto text-base text-gray-900 font-semibold  sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            <HoursOfOperation timeStamp={restaurantDetails?.hoursOfOperation} />
            {restaurantDetails?.hoursOfOperation && <RestaurantStatus hoursOfOperation={restaurantDetails?.hoursOfOperation} />}
            {restaurantDetails.location} | {restaurantDetails.cuisineType} | {restaurantDetails.phoneNumber}
          </div>
          <span className="text-lg font-semibold">
            <span className="text-yellow-500">★</span>
            <span className="ml-1">{restaurantDetails.averageRating || 0}</span>
            <span className="ml-2 text-gray-600">({restaurantDetails.numRatings || 0} ratings)</span>
          </span>
        </div>
      </div>
      <div className="flex justify-center">
        {user?.userId ? (
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-4 flex items-center justify-between rounded-t-md w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-yellow-500 mr-2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293-.511A1 1 0 013 12V4a1 1 0 011-1h4a1 1 0 011 1v1h10a1 1 0 011 1v5a1 1 0 01-.768.963L17 13.126l-4.649 2.32a1 1 0 01-.894 0L7 13m0 0a2 2 0 102 2 2 2 0 00-2-2z"
                />
              </svg>
              <div>
                <p>Total Items: {totalItems}</p>
                <p>Total: ₹{totalPrice}</p>
              </div>
            </div>
            <button className="bg-yellow-500 font-bold text-gray-800 px-4 py-2 rounded" onClick={() => setIsModalOpen(true)}>
              Place Order
            </button>
          </div>
        ) : (
          <div className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-4 flex items-center justify-center rounded-t-md w-full md:w-1/2 lg:w-1/3 xl:w-1/4`}>
            <Link to="/login" className={`bg-yellow-500 ${isButtonHighlighted && "text-lg text-yellow-400 bg-yellow-800"} font-bold text-gray-800 px-4 py-2 rounded`}>
              Login to place order
            </Link>
          </div>
        )}
      </div>
      <div className={`flex flex-col items-center ${(restaurantStatus == "Closed" || restaurantStatus == "Opens soon") && "opacity-50 pointer-events-none "}  justify-center pb-20`}>
        {isLoading && (
          <div className="flex justify-center items-center">
            <img src={Loading} className="w-12" alt="Loading" />
          </div>
        )}
        {restaurantDetails?.menuItems?.map((item, index) => (
          <MenuItemCard key={index} item={item} cart={cart} handleDecrement={handleDecrement} handleIncrement={handleIncrement} handlePlusMinusClick={handlePlusMinusClick} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantPage;

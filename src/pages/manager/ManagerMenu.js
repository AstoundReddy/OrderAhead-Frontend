import React, { useCallback, useContext, useState } from "react";
import { useEffect } from "react";
import { restaurantApi } from "../../api/restaurantApi";
import AddItemModal from "../../components/Manager/AddItemModal";
import Rating from "../../components/Rating";
import HoursOfOperation from "../../components/HoursOfOp";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../assets/loading2svg.svg";
import { toast } from "react-toastify";
export default function ManagerMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [modalItem, setModalItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(AuthContext);
  const handleAdd = () => {
    setIsModalOpen(true);
    setModalItem(null);
  };

  const handleEdit = (item) => {
    setIsModalOpen(true);
    setModalItem(item);
  };

  const handleDelete = (id) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await restaurantApi.getRestaurantById(user.restaurantId);
      const { menuItems, ...restaurantDetails } = response.data;
      setRestaurantDetails(restaurantDetails);
      setMenuItems(menuItems);
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  }, [user]);
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);
  return (
    <div className="bg-gray-100 min-h-screen ">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {isLoading && (
          <div className="flex justify-center items-center">
            <img src={Loading} className="w-12" alt="Loading" />
          </div>
        )}
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 rounded-lg border-gray-800 overflow-x-auto p-2">
            <div className="p-4">
              <div className="max-w-7xl mb-6 mx-auto  px-4 border-2 sm:px-6 relative">
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
                    {restaurantDetails.location} | {restaurantDetails.cuisineType} | {restaurantDetails.phoneNumber}
                  </div>
                  <span className="text-lg font-semibold">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1">{restaurantDetails.averageRating || 0}</span>
                    <span className="ml-2 text-gray-600">({restaurantDetails.numRatings || 0} ratings)</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Availability
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ratings
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {menuItems?.map((item) => (
                    <tr key={item.itemId}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-yellow-500 focus:bg-white focus:ring-0" required>
                          {item.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="mt-1 text-wrap block w-full rounded-md bg-gray-100 border-transparent focus:border-yellow-500 focus:bg-white focus:ring-0" required>
                          {item.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div step="0.01" className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-yellow-500 focus:bg-white focus:ring-0" required>
                          {item.price}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="mt-1 block w-20 overflow-hidden overflow-ellipsis rounded-md bg-gray-100 border-transparent focus:border-yellow-500 focus:bg-white focus:ring-0" required>
                          {item.image}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input type="checkbox" readOnly checked={item.availability} className="mt-1 block rounded bg-gray-100 border-transparent focus:border-yellow-500 focus:bg-white focus:ring-0" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex">
                          <Rating rating={item.averageRating} />
                          <p>({item.numberOfRatings})</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 flex whitespace-nowrap">
                        <svg
                          onClick={() => handleDelete(item.id)}
                          className="w-6 h-6 text-blue-500 cursor-pointer self-center"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                        <svg
                          onClick={() => handleEdit(item)}
                          className="w-6 h-6 text-yellow-500 self-center cursor-pointer ml-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end mt-4">
              <button onClick={() => handleAdd()} className="text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg">
                Add Item
              </button>
            </div>

            <AddItemModal
              fetchItems={fetchItems}
              isOpen={isModalOpen}
              item={modalItem}
              cuisine={restaurantDetails?.cuisineType}
              onClose={() => {
                setModalItem(null);
                setIsModalOpen(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

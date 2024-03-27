import Modal from "react-modal";
import { useContext, useEffect, useState } from "react";
import { restaurantApi } from "../../api/restaurantApi";
import { menuApi } from "../../api/menuApi";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import Loading from "../../assets/loading2svg.svg";
import { GoogleGenerativeAI } from "@google/generative-ai";

Modal.setAppElement("#root"); // replace '#root' with the id of your app's root element

function AddItemModal({ isOpen, onClose, item, fetchItems, cuisine }) {
  const genAI = new GoogleGenerativeAI("AIzaSyBdEe_va13BzyZ9OPfiG3WY5HukhhMlvxA");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("https://source.unsplash.com/featured/?food");

  const [availability, setAvailability] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (item) {
      setName(item.name);
      setDescription(item.description);
      setPrice(item.price);
      setImage(item.image);
      setAvailability(item.availability);
    } else {
      setName("");
      setDescription("");
      setPrice("");
      setImage("https://source.unsplash.com/featured/?food");
      setAvailability(true);
    }
  }, [item]);
  const handleClose = () => {
    setName("");
    setDescription("");
    setPrice("");
    setImage("https://source.unsplash.com/featured/?food");
    setAvailability(true);
    onClose();
  };
  const addItem = async () => {
    setIsLoading(true);
    try {
      await restaurantApi.addItemByRestaurantId(user.restaurantId, { name, description, price, image, availability });
      toast.success("Item added successfully");
      fetchItems();
      handleClose();
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };
  const editItem = async () => {
    try {
      await menuApi.editItemById(item.itemId, { name, description, price, image, availability });
      toast.success("Item updated successfully");
      fetchItems();
      handleClose();
    } catch (error) {
      toast.error("Error updating item");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (item?.itemId) editItem();
    else addItem();
  };

  const generate = async (field) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    let prompt;
    switch (field) {
      case "name":
        prompt =
          "Generate one name of my menu item to fill the name field of the item in restaurant whose cuisine is " +
          cuisine +
          ". Name of just a single item in plain text without bold to fill the field";
        break;
      case "description":
        prompt = "Generate a one line description to display in my menu for" + name;
        break;
      case "price":
        prompt =
          "Generate indian price for my menu item , restaurant cuisine is " +
          cuisine +
          " and item name is " +
          name +
          " and description is " +
          description +
          ". It should just be a whole number without any currency sign";
        break;
      default:
        prompt = "Generate a one line description to display in my menu for" + name;
    }
    setIsLoading(true);
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      if (field === "name") setName(text);
      if (field === "description") setDescription(text);
      if (field === "price") setPrice(text);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Add Item"
        className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
        overlayClassName="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Add Item</h3>
        {isLoading && (
          <div className="flex justify-center items-center">
            <img src={Loading} className="w-12" alt="Loading" />
          </div>
        )}
        <form onSubmit={(e) => handleSubmit(e)} className="mt-2">
          <label className=" self-center block mt-4">
            <div className=" flex space-x-2">
              <span className="font-semibold text-gray-700 self-center">Name</span>
              <div className="flex">
                <button
                  type="button"
                  onClick={() => generate("name")}
                  className="bg-gradient-to-r w-20 hover:bg-black text-sm from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white  px-2 py-1 rounded-md">
                  Generate
                </button>
              </div>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-1 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-yellow-500 focus:bg-white focus:ring-0"
              required
            />
          </label>

          <label className=" self-center block mt-4">
            <div className=" flex space-x-2">
              <span className="font-semibold text-gray-700 self-center">Description</span>
              <div className="flex">
                <button
                  type="button"
                  onClick={() => generate("description")}
                  className="bg-gradient-to-r text-sm from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white  px-2 py-1 rounded-md shadow-md transition duration-200 ease-in-out">
                  Generate
                </button>
              </div>
            </div>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-yellow-500 focus:bg-white focus:ring-0"
              required
            />
          </label>

          <label className=" self-center block mt-4">
            <div className=" flex space-x-2">
              <span className="font-semibold text-gray-700 self-center">Price</span>
              <div className="flex">
                <button
                  type="button"
                  onClick={() => generate("price")}
                  className="bg-gradient-to-r text-sm from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white  px-2 py-1 rounded-md shadow-md transition duration-200 ease-in-out">
                  Generate
                </button>
              </div>
            </div>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="p-1 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-yellow-500 focus:bg-white focus:ring-0"
              required
            />
          </label>

          <label className=" self-center block mt-4">
            <span className="font-semibold text-gray-700">Image URL</span>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="p-1 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-yellow-500 focus:bg-white focus:ring-0"
              required
            />
          </label>

          <label className=" self-center block  mt-4">
            <span className="font-semibold w-10 text-gray-700">Availability</span>
            <input
              type="checkbox"
              checked={availability}
              onChange={(e) => setAvailability(e.target.checked)}
              className="p-1 mt-1 block rounded w-10 bg-gray-100  border-transparent focus:border-yellow-500 focus:bg-white focus:ring-0"
            />
          </label>

          <div className="mt-4">
            <button type="submit" className="text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg">
              Save
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default AddItemModal;

import Modal from "react-modal";
import { useContext, useEffect, useState } from "react";
import { restaurantApi } from "../../api/restaurantApi";
import { menuApi } from "../../api/menuApi";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";

Modal.setAppElement("#root"); // replace '#root' with the id of your app's root element

function AddItemModal({ isOpen, onClose, item, fetchItems }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("https://source.unsplash.com/featured/?food");
  const [availability, setAvailability] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useContext(AuthContext);
  useEffect(() => {
    console.log("item", item);
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
    setError(null);
    onClose();
  };
  const addItem = async () => {
    try {
      const response = await restaurantApi.addItemByRestaurantId(user.restaurantId, { name, description, price, image, availability });
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
      const response = await menuApi.editItemById(item.itemId, { name, description, price, image, availability });
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

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Add Item"
        className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
        overlayClassName="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Add Item</h3>

        <form onSubmit={(e) => handleSubmit(e)} className="mt-2">
          <label className="block mt-4">
            <span className="text-gray-700">Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-1 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-yellow-500 focus:bg-white focus:ring-0"
              required
            />
          </label>

          <label className="block mt-4">
            <span className="text-gray-700">Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-yellow-500 focus:bg-white focus:ring-0"
              required
            />
          </label>

          <label className="block mt-4">
            <span className="text-gray-700">Price</span>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="p-1 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-yellow-500 focus:bg-white focus:ring-0"
              required
            />
          </label>

          <label className="block mt-4">
            <span className="text-gray-700">Image URL</span>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="p-1 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-yellow-500 focus:bg-white focus:ring-0"
              required
            />
          </label>

          <label className="block  mt-4">
            <span className="w-10 text-gray-700">Availability</span>
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

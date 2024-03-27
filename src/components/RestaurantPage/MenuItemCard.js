import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function MenuItemCard({ item, cart, handleIncrement, handleDecrement, handlePlusMinusClick }) {
  const { user } = useContext(AuthContext);
  const imageUrl = `https://source.unsplash.com/160x160/?food,${item.name}`;
  return (
    <div className={`flex items-start justify-between w-full max-w-2xl p-4 mb-4 bg-white rounded shadow`}>
      <div className="w-1/2">
        <div className="flex">
          <h2 className="text-xl font-bold self-center ">{item.name}</h2>
          <p className="text-red-600 border rounded-full self-center mx-2 p-2 font-bold">{!item.availability && "Unavailable"}</p>
        </div>
        <p className="mt-2 text-gray-600">{item.description}</p>
        <p className="mt-2 text-gray-600">Price: ₹{item.price}</p>
        <div className="mt-2 flex items-center">
          <span className="text-yellow-500">★</span>
          <span className="ml-1">{item.averageRating || 0}</span>
          <span className="ml-2 text-gray-600">({item.numberOfRatings || 0} ratings)</span>
        </div>
      </div>
      <div className={`w-2/5 md:w-1/4 ${!item.availability && "opacity-50"}`}>
        <div className="flex w-auto items-center justify-center">
          <img className="object-contain max-h-32   rounded" src={imageUrl} alt={item.name} />
        </div>
        <div className="flex  items-center justify-between m-1  text-green-700 text-lg font-bold font-sans px-4 py-2 rounded-md border-2 border-green-700">
          <button onClick={() => (item.availability && user?.userId ? handleDecrement(item.itemId) : handlePlusMinusClick())} className="font-bold">
            -
          </button>
          <span>{cart[item.itemId] || 0}</span>
          <button onClick={() => (item.availability && user?.userId ? handleIncrement(item.itemId) : handlePlusMinusClick())} className="font-bold">
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuItemCard;

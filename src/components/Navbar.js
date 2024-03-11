import React, { useContext, useEffect, useRef, useState } from "react";
import Logo1 from "../assets/images/Logo1-removebg.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import debounce from "lodash.debounce";
import { restaurantApi } from "../api/restaurantApi";
import Rating from "./Rating";
import { ToastContainer, toast } from "react-toastify";
const Navbar = ({ toggleSidebar }) => {
  const searchInputRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isManager, setIsManager] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  useEffect(() => {
    if (user?.restaurantId) setIsManager(true);
  }, [user]);
  const handleSearch = debounce(async (searchTerm) => {
    if (searchTerm.length < 3) return setSearchResults([]);
    try {
      const response = await restaurantApi.searchByString(searchTerm);
      setSearchResults(response.data);
    } catch (err) {
      toast.error("Error searching");
    }
  }, 500);
  const handleSearchResultClick = () => {
    setSearchResults([]);
    handleSearch.cancel();
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
  };
  return (
    <>
      <div className="bg-gray-800 text-white fixed z-10 font-sans font-semibold w-full p-1">
        <div className="flex items-center justify-between">
          <Link className="flex" to={isManager ? "/manager/dashboard" : "/"}>
            <img className="w-12" src={Logo1} alt="Logo" />
            <p className="px-2 self-center hidden md:block font-serif text-lg font-extrabold border-r-4 text-yellow-500 border-yellow-600">Order Ahead</p>
          </Link>
          {!isManager && (
            <div className="relative w-full sm:w-64 md:w-96 lg:w-128 ">
              <input
                ref={searchInputRef}
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
                className="border-2 border-gray-300 bg-white h-10 my-2 px-4 w-full rounded-full text-black text-sm focus:outline-none"
                type="search"
                name="search"
                placeholder="Search"
              />
              {(searchResults?.menuItems?.length > 0 || searchResults?.restaurants?.length > 0) && (
                <div className="absolute mt-2 z-20 rounded-md w-full  bg-white text-black shadow-lg  border border-gray-200 divide-y divide-gray-100">
                  {searchResults?.menuItems?.map((item, index) => (
                    <Link key={index} onClick={handleSearchResultClick} to={`/restaurant/${item.restaurantId}`} className="px-4 py-2 flex  w-full justify-between hover:bg-gray-200">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.restaurantName}</p>
                      </div>
                      <Rating rating={item.averageRating} />
                    </Link>
                  ))}
                  {searchResults?.restaurants?.map((restaurant, index) => (
                    <Link key={index} onClick={handleSearchResultClick} to={`/restaurant/${restaurant.restaurantId}`} className=" px-4 py-2 flex w-full justify-between hover:bg-gray-200">
                      <p className="font-semibold">{restaurant.name}</p>
                      <Rating rating={restaurant.averageRating} />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
          <div className="flex">
            {isManager ? (
              <>
                <Link to="/manager/dashboard" className="mx-2 hover:scale-105">
                  Dashboard
                </Link>
                <Link to="/manager/menu" className="mx-2 hover:scale-105">
                  Menu
                </Link>
              </>
            ) : (
              <div className="hidden md:block">
                <Link to="/" className="mx-2 hover:scale-105">
                  Restaurants
                </Link>
                {user?.userId ? (
                  <Link to="/orders" className="mx-2 hover:scale-105">
                    Orders
                  </Link>
                ) : (
                  <Link to="/login" className="mx-2 hover:scale-105">
                    Login
                  </Link>
                )}
              </div>
            )}
            <div className="relative inline-block text-left">
              <div>
                <button onClick={() => setShowDropdown(!showDropdown)} type="button" className="mx-2 hover:scale-105">
                  More
                </button>
              </div>

              {showDropdown && (
                <div className="origin-top-right absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div onClick={() => setShowDropdown(false)} className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <div className="md:hidden">
                      <Link to="/" className="block px-4 py-2 text-sm bg-gray-800 text-gray-100 hover:bg-gray-700 hover:text-white">
                        Restaurants
                      </Link>
                      {user?.userId ? (
                        <Link to="/orders" className="block px-4 py-2 text-sm bg-gray-800 text-gray-100 hover:bg-gray-700 hover:text-white">
                          Orders
                        </Link>
                      ) : (
                        <Link to="/login" className="block px-4 py-2 text-sm bg-gray-800 text-gray-100 hover:bg-gray-700 hover:text-white">
                          Login
                        </Link>
                      )}
                    </div>
                    {user?.userId && (
                      <Link to="/profile" className="block px-4 py-2 text-sm bg-gray-800 text-gray-100 hover:bg-gray-700 hover:text-white" role="menuitem">
                        Profile
                      </Link>
                    )}
                    <Link to="/about" className="block px-4 py-2 text-sm bg-gray-800 text-gray-100 hover:bg-gray-700 hover:text-white" role="menuitem">
                      About Us
                    </Link>
                    {(user?.userId || user?.restaurantId) && (
                      <button
                        onClick={() => {
                          logout();
                          if (user?.userId) navigate("/login");
                          if (user?.restaurantId) navigate("/manager/login");
                        }}
                        className="w-full px-4 py-2 text-left text-sm bg-gray-800 text-gray-100 hover:bg-gray-700 hover:text-white"
                        role="menuitem">
                        Logout
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

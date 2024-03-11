import React, { useContext, useState } from "react";
import LogoWithText from "../../assets/images/LogoWithText.png";
import { restaurantApi } from "../../api/restaurantApi";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

function ManagerRegister() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("user.password");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "restaurant.hoursOfOperation",
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  function formatHoursOfOperation(hoursOfOperation) {
    return hoursOfOperation
      .filter((hour) => hour.openingTime && hour.closingTime) // Remove entries with empty strings
      .map((hour) => `${hour.openingTime}-${hour.closingTime}`) // Convert each entry to 'openingTime-closingTime' format
      .join(", "); // Join all entries with ', '
  }
  const registerManagerAndRestaurant = async (data) => {
    try {
      const response = await restaurantApi.registerManager({
        ...data,
      });
      toast.success("Registration successful, go ahead and create your menu!");
      login(response.data);
      navigate("/manager/menu");
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  const onSubmit = (data) => {
    data.restaurant.hoursOfOperation = formatHoursOfOperation(data.hoursOfOperation);
    data.user.role = "MANAGER";
    delete data.hoursOfOperation;
    delete data.confirmPassword;
    registerManagerAndRestaurant(data);
  };

  return (
    <div className="min-h-screen  w-full  bg-gray-100 py-2 flex flex-col justify-center sm:py-4">
      <div className="relative py-3 font-sans font-medium  md:mx-20 lg:mx-40 ">
        <div className="relative px-4 py-4 bg-white mx-8 md:mx-0  shadow rounded-3xl sm:p-10">
          <div className="min-w-7xl  mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between space-x-5">
              <div className="block pl-2  self-start text-gray-700">
                <h2 className="leading-relaxed font-semibold text-xl self-center">Manager Registration</h2>
                <p className="leading-relaxed text-sm self-center">
                  Already have an account?
                  <Link to="/manager/login" className="text-indigo-500 mx-1">
                    {" "}
                    Login
                  </Link>
                </p>
              </div>
              <img src={LogoWithText} alt="Logo" className="mx-auto order-first md:order-last h-20" /> {/* Display the logo */}
            </div>
            <div className="divide-y divide-gray-200">
              <form className=" text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="grid lg:grid-cols-2 gap-4">
                  {/* Manager form fields */}
                  <div className="flex flex-col">
                    <div className="flex flex-col">
                      <label className="leading-loose text-sm">First Name</label>
                      <input
                        type="text"
                        {...register("user.firstName", { required: "First name is required" })}
                        className="px-2 py-2 border focus:ring-yellow-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      />
                      {errors.user?.firstName && <p className="text-red-500 text-xs font-semibold font-sans">{errors.user?.firstName.message}</p>}
                    </div>
                    <div className="flex flex-col">
                      <label className="leading-loose text-sm">Last Name</label>
                      <input
                        type="text"
                        {...register("user.lastName", { required: "Last name is required" })}
                        className="px-2 py-2 border focus:ring-yellow-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      />
                      {errors.user?.lastName && <p className="text-red-500 text-xs font-semibold font-sans">{errors.user?.lastName.message}</p>}
                    </div>
                    <div className="flex flex-col">
                      <label className="leading-loose text-sm">Email</label>
                      <input
                        type="email"
                        {...register("user.email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
                        className="px-2 py-2 border focus:ring-yellow-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      />
                      {errors.user?.email && <p className="text-red-500 text-xs font-semibold font-sans">{errors.user?.email.message}</p>}
                    </div>
                    <div className="flex flex-col">
                      <label className="leading-loose text-sm">Phone Number</label>
                      <input
                        type="tel"
                        {...register("user.phoneNumber", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Invalid phone number",
                          },
                        })}
                        className="px-2 py-2 border focus:ring-yellow-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      />
                      {errors.user?.phoneNumber && <p className="text-red-500 text-xs font-semibold font-sans">{errors.user?.phoneNumber.message}</p>}
                    </div>
                    <div className="flex flex-col">
                      <label className="leading-loose text-sm">Password</label>
                      <input
                        type="password"
                        {...register("user.password", { required: "Password is required", minLength: { value: 8, message: "Password should be at least 8 characters" } })}
                        className="px-2 py-2 border focus:ring-yellow-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      />
                      {errors.user?.password && <p className="text-red-500 text-xs font-semibold font-sans">{errors.user?.password.message}</p>}
                    </div>
                    <div className="flex flex-col">
                      <label className="leading-loose text-sm">Confirm Password</label>
                      <input
                        id="confirmPassword"
                        {...register("confirmPassword", { required: "Confirm password is required", validate: (value) => value === password || "The passwords do not match" })}
                        type="password"
                        autoComplete="new-password"
                        className="px-2 py-2 border focus:ring-yellow-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      />
                      {errors.confirmPassword && <p className="text-red-500 text-xs font-semibold font-sans">{errors.confirmPassword.message}</p>}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-col">
                      <label className="leading-loose text-sm">Restaurant Name</label>
                      <input
                        type="text"
                        {...register("restaurant.name", { required: "Restaurant name is required" })}
                        className="px-2 py-2 border focus:ring-yellow-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      />
                      {errors.restaurant?.name && <p className="text-red-500 text-xs font-semibold font-sans">{errors.restaurant?.name.message}</p>}
                    </div>
                    <div className="flex flex-col">
                      <label className="leading-loose text-sm">Location</label>
                      <input
                        type="text"
                        {...register("restaurant.location", { required: "Location is required" })}
                        className="px-2 py-2 border focus:ring-yellow-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      />
                      {errors.restaurant?.location && <p className="text-red-500 text-xs font-semibold font-sans">{errors.restaurant?.location.message}</p>}
                    </div>
                    <label className="leading-loose text-sm">Hours of Operation</label>
                    <div className="flex flex-row flex-wrap space-x-2 border p-2 rounded items-center">
                      {fields.map((field, index) => (
                        <div key={field.id}>
                          <div className="flex flex-col w-32">
                            <label className="leading-loose text-sm">Opening Time</label>
                            <input
                              type="time"
                              {...register(`hoursOfOperation.${index}.openingTime`, { required: "Opening time is required" })}
                              className="px-4 py-2 border focus:ring-yellow-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                            />
                            {errors.hoursOfOperation?.[index]?.openingTime && <p className="text-red-500 text-xs font-semibold font-sans">{errors.hoursOfOperation[index].openingTime.message}</p>}
                          </div>
                          <div className="flex flex-col w-32">
                            <label className="leading-loose text-sm">Closing Time</label>
                            <input
                              type="time"
                              {...register(`hoursOfOperation.${index}.closingTime`, { required: "Closing time is required" })}
                              className="px-4 py-2 border focus:ring-yellow-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                            />
                            {errors.hoursOfOperation?.[index]?.closingTime && <p className="text-red-500 text-xs font-semibold font-sans">{errors.hoursOfOperation[index].closingTime.message}</p>}
                          </div>
                          <button className="text-sm bg-red-500 m-1 text-white p-1 rounded" onClick={() => remove(index)}>
                            Remove
                          </button>
                        </div>
                      ))}
                      {fields.length < 4 && (
                        <button
                          className="text-sm bg-yellow-500 self-center text-white p-1 rounded "
                          type="button"
                          onClick={() => {
                            // e.preventDefault();
                            append({ openingTime: "", closingTime: "" });
                          }}>
                          Add
                        </button>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label className="leading-loose text-sm">Cuisine Type</label>
                      <input
                        type="text"
                        {...register("restaurant.cuisineType", { required: "Cuisine type is required" })}
                        className="px-2 py-2 border focus:ring-yellow-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      />
                      {errors.restaurant?.cuisineType && <p className="text-red-500 text-xs font-semibold font-sans">{errors.restaurant?.cuisineType.message}</p>}
                    </div>
                    <div className="flex flex-col">
                      <label className="leading-loose text-sm">Restaurant Phone Number</label>
                      <input
                        type="tel"
                        {...register("restaurant.phoneNumber", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Invalid phone number",
                          },
                        })}
                        className="px-2 py-2 border focus:ring-yellow-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      />
                      {errors.restaurant?.phoneNumber && <p className="text-red-500 text-xs font-semibold font-sans">{errors.restaurant?.phoneNumber.message}</p>}
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleSubmit(onSubmit)}
                  className="mt-3 text-center w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-50">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerRegister;

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import LogoWithText from "../../assets/images/LogoWithText.png";
import acceptorder from "../../assets/images/acceptorder.png";
import placeorder from "../../assets/images/placeorder.png";
import orderready from "../../assets/images/orderready.png";
import { userApi } from "../../api/userApi";
import { AuthContext } from "../../context/AuthContext";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Loading from "../../assets/loading.gif";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const password = watch("password");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const loginUser = async (data) => {
    setIsLoading(true);
    try {
      const response = await userApi.loginUser({
        ...data,
      });
      login(response.data);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };
  const signUpUser = async (data) => {
    setIsLoading(true);
    try {
      const response = await userApi.registerUser({
        ...data,
        role: "USER",
      });
      login(response.data);

      navigate("/");
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };
  const onSubmit = (data) => {
    delete data.confirmPassword;
    if (isLogin) loginUser(data);
    else signUpUser(data);
  };

  return (
    <>
      <div className=" bg-gray-100 h-full flex">
        <button
          onClick={() => navigate("/manager/login")}
          className=" absolute font-sans font-semibold w-full text-xs text-center tracking-wider top-0 bg-black bg-opacity-50 text-white hover:bg-opacity-90 ">
          Switch to manager side
        </button>
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 order-last lg:order-first flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <img className="w-auto" src={LogoWithText} alt="Logo" />
              <div className="flex">
                <h2 className=" text-3xl self-center leading-9 font-extrabold text-gray-900">{isLogin ? "Sign in to your account" : "Sign up"}</h2>
              </div>

              <div className="mt-8">
                <div className="mt-6">
                  <form className="space-y-3">
                    {isLogin && (
                      <>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                          </label>
                          <div className="mt-1">
                            <input
                              id="email"
                              {...register("email", {
                                required: "Email is required",
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                  message: "Invalid email address",
                                },
                              })}
                              className="appearance-none block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.email && <p className="text-red-500 text-xs font-semibold font-sans">{errors.email.message}</p>}
                          </div>
                        </div>

                        <div>
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                          </label>
                          <div className="mt-1">
                            <input
                              id="password"
                              {...register("password", {
                                required: "Password is required",
                                minLength: {
                                  value: 8,
                                  message: "Password must be at least 8 characters long",
                                },
                              })}
                              type="password"
                              autoComplete="current-password"
                              className="appearance-none block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.password && <p className="text-red-500 text-xs font-semibold font-sans">{errors.password.message}</p>}
                          </div>
                        </div>
                      </>
                    )}
                    {!isLogin && (
                      <>
                        <div className="flex flex-col">
                          <label className="block text-sm font-medium text-gray-700">First Name</label>
                          <input
                            type="text"
                            {...register("firstName", { required: "First name is required" })}
                            className="px-2 py-2 border focus:ring-yellow-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          />
                          {errors.firstName && <p className="text-red-500 text-xs font-semibold font-sans">{errors.firstName.message}</p>}
                        </div>
                        <div className="flex flex-col">
                          <label className="block text-sm font-medium text-gray-700">Last Name</label>
                          <input
                            type="text"
                            {...register("lastName", { required: "Last name is required" })}
                            className="px-2 py-2 border focus:ring-yellow-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          />
                          {errors.lastName && <p className="text-red-500 text-xs font-semibold font-sans">{errors.lastName.message}</p>}
                        </div>
                        <div className="flex flex-col">
                          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                          <input
                            type="tel"
                            {...register("phoneNumber", {
                              required: "Phone number is required",
                              pattern: {
                                value: /^\d{10}$/,
                                message: "Invalid phone number, must be 10 digits",
                              },
                            })}
                            className="px-2 py-2 border focus:ring-yellow-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          />
                          {errors.phoneNumber && <p className="text-red-500 text-xs font-semibold font-sans">{errors.phoneNumber.message}</p>}
                        </div>
                        <div className="flex flex-col">
                          <label className="block text-sm font-medium text-gray-700">Email address</label>
                          <input
                            id="email"
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Invalid email address",
                              },
                            })}
                            type="email"
                            autoComplete="email"
                            className="px-2 py-2 border focus:ring-yellow-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          />
                          {errors.email && <p className="text-red-500 text-xs font-semibold font-sans">{errors.email.message}</p>}
                        </div>

                        <div className="flex flex-col">
                          <label className="block text-sm font-medium text-gray-700">Password</label>
                          <input
                            id="password"
                            {...register("password", {
                              required: "Password is required",
                              minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters long",
                              },
                            })}
                            type="password"
                            autoComplete="current-password"
                            className="px-2 py-2 border focus:ring-yellow-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          />
                          {errors.password && <p className="text-red-500 text-xs font-semibold font-sans">{errors.password.message}</p>}
                        </div>
                        <div className="flex flex-col">
                          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                          <input
                            id="confirmPassword"
                            {...register("confirmPassword", { required: "Confirm password is required", validate: (value) => value === password || "The passwords do not match" })}
                            type="password"
                            autoComplete="new-password"
                            className="px-2 py-2 border focus:ring-yellow-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          />
                          {errors.confirmPassword && <p className="text-red-500 text-xs font-semibold font-sans">{errors.confirmPassword.message}</p>}
                        </div>
                      </>
                    )}
                  </form>

                  <div className="mt-2 block text-sm font-medium text-gray-700 ">
                    {isLogin ? (
                      <div>
                        Don't have an account?
                        <button onClick={() => setIsLogin(false)} className="text-indigo-600 mx-1 hover:text-indigo-500">
                          {" "}
                          Sign up
                        </button>
                      </div>
                    ) : (
                      <div>
                        Already have an account?
                        <button onClick={() => setIsLogin(true)} className="text-indigo-600 mx-1 hover:text-indigo-500">
                          {" "}
                          Sign in
                        </button>
                        <div>
                          You a restaurant owner?{" "}
                          <Link to="/manager/register" className="text-indigo-600 mx-1 hover:text-indigo-500">
                            Register here
                          </Link>
                        </div>
                      </div>
                    )}

                    <div>
                      <button
                        onClick={handleSubmit(onSubmit)}
                        className="w-full flex mt-2 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        {!isLoading && isLogin ? "Sign in" : "Sign up"}
                        {isLoading && (
                          <div className="flex justify-center items-center">
                            <img src={Loading} alt="Loading" />
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 order-first lg:order-last p-10 flex">
            <div className="rounded self-center">
              <Carousel autoPlay infiniteLoop showThumbs={false}>
                <div className="relative">
                  <img className="w-full rounded" src={placeorder} alt="place" />
                  <p className="absolute w-full text-center top-0 bg-black bg-opacity-50 text-white p-2 text-lg font-semibold tracking-wider">Order your favorite meals in a few clicks</p>
                </div>
                <div className="relative">
                  <img className="w-full rounded" src={acceptorder} alt="accept " />
                  <p className="absolute w-full text-center top-0 bg-black bg-opacity-50 text-white p-2 text-lg font-semibold tracking-wider">Track your order in real-time</p>
                </div>
                <div className="relative">
                  <img className="w-full rounded" src={orderready} alt="ready" />
                  <p className="absolute w-full text-center top-0 bg-black bg-opacity-50 text-white p-2 text-lg font-semibold tracking-wider">Enjoy your meal, no more waiting!</p>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

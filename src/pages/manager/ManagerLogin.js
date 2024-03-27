import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoWithText from "../../assets/images/LogoWithText.png";
import placeorder from "../../assets/images/placeorder.png";
import acceptorder from "../../assets/images/acceptorder.png";
import orderready from "../../assets/images/orderready.png";
import { restaurantApi } from "../../api/restaurantApi";
import { AuthContext } from "../../context/AuthContext";
import { Carousel } from "react-responsive-carousel";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
const ManagerLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const authenticate = async (data) => {
    try {
      const response = await restaurantApi.loginManager({
        ...data,
      });
      login(response.data);
      navigate("/manager/dashboard");
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  const onSubmit = (data) => {
    authenticate(data);
  };

  return (
    <>
      <div className=" bg-gray-100 h-full flex">
        <button onClick={() => navigate("/login")} className=" absolute font-sans font-semibold w-full text-xs text-center tracking-wider top-0 bg-black bg-opacity-50 text-white hover:bg-opacity-90 ">
          Switch to User Side
        </button>
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 order-last lg:order-first flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <img className="w-auto" src={LogoWithText} alt="Logo" />
              <div className="">
                <h2 className=" text-3xl self-center leading-9 font-extrabold text-gray-900">{"Welcome Manager!"}</h2>
                <h2 className=" text-3xl self-center leading-9 font-extrabold text-gray-900">{"Sign in to your account"}</h2>
              </div>
              <div className="mt-8">
                <div className="mt-6">
                  <form className="space-y-6">
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
                  </form>

                  <div className="mt-2 block text-sm font-medium text-gray-700 ">
                    <div>
                      Don't have an account?
                      <Link to="/manager/register" className="text-indigo-600 mx-1 hover:text-indigo-500">
                        {" "}
                        Sign up
                      </Link>
                    </div>
                    <div>
                      <button
                        onClick={handleSubmit(onSubmit)}
                        className="w-full flex mt-2 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Sign in
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
                  <img className="object-scale-down w-1/2 rounded" src={placeorder} alt="place" />
                  <p className="absolute font-sans font-semibold w-full text-center tracking-wider top-0 bg-black bg-opacity-50 text-white p-2">Manage orders efficiently with our app</p>
                </div>
                <div className="relative">
                  <img className="object-scale-down w-1/2 rounded" src={acceptorder} alt="accept " />
                  <p className="absolute font-sans font-semibold w-full text-center tracking-wider top-0 bg-black bg-opacity-50 text-white p-2">Stay connected with your customers in real-time</p>
                </div>
                <div className="relative">
                  <img className="object-scale-down w-1/2 rounded" src={orderready} alt="ready" />
                  <p className="absolute font-sans font-semibold w-full text-center tracking-wider top-0 bg-black bg-opacity-50 text-white p-2">Improve your service with instant notifications</p>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagerLogin;

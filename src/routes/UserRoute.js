import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Login from "../pages/user/Login";
import OrdersPage from "../pages/user/OrdersPage";
import RestaurantPage from "../pages/user/RestaurantPage";
import HomePage from "../pages/user/HomePage";

export default function UserRoute() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <div className="py-8"></div>
            <Outlet />
          </>
        }>
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/restaurant/:restaurantId" element={<RestaurantPage />} />
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

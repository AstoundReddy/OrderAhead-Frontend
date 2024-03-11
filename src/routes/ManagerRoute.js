import { Outlet, Route, Routes } from "react-router-dom";
import ManagerLogin from "../pages/manager/ManagerLogin";
import ManagerDashboard from "../pages/manager/ManagerDashboard";
import ManagerMenu from "../pages/manager/ManagerMenu";
import Navbar from "../components/Navbar";
import ManagerRestaurant from "../pages/manager/ManagerRestaurant";
import ManagerRegister from "../pages/manager/ManagerRegister";

export default function ManagerRoute() {
  return (
    <Routes>
      <Route path="login" element={<ManagerLogin />} />
      <Route path="register" element={<ManagerRegister />} />
      <Route path="restaurantDetails" element={<ManagerRestaurant />} />
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <div className="py-8"></div>
            <Outlet />
          </>
        }>
        <Route path="dashboard" element={<ManagerDashboard />} />
        <Route path="menu" element={<ManagerMenu />} />
      </Route>
    </Routes>
  );
}

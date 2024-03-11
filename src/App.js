import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ManagerRoute from "./routes/ManagerRoute";
import UserRoute from "./routes/UserRoute";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <div className="">
      <AuthProvider>
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="manager/*" element={<ManagerRoute />} />
            <Route path="/*" element={<UserRoute />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;

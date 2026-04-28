import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { useContext, useState } from "react"; // ⚓ Added useState
import { AppContent } from "../context/AppContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false); // ⚓ Local state for toggle
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContent);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-verify-otp`,
        {},
        { withCredentials: true },
      );

      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      if (data.success) {
        setIsLoggedin(false);
        setUserData(false);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="w-28 sm:w-32 cursor-pointer"
      />

      {userData ? (
        /* Clickable Profile Icon */
        <div
          onClick={() => setShowMenu(!showMenu)}
          className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative cursor-pointer select-none"
        >
          {userData.name[0].toUpperCase()}

          {/* Menu logic: Hidden unless showMenu is true */}
          <div
            className={`${showMenu ? "block" : "hidden"} absolute top-10 right-0 z-10 text-black border border-gray-300 shadow-md`}
          >
            <ul className="list-none m-0 p-2 bg-gray-100 text-sm whitespace-nowrap rounded">
              {!userData.isAccountVerified && (
                <li
                  onClick={sendVerificationOtp}
                  className="py-2 px-4 hover:bg-gray-200 cursor-pointer border-b border-gray-200"
                >
                  Verify email
                </li>
              )}
              <li
                onClick={logout}
                className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-500 px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all rounded-3xl cursor-pointer"
        >
          Login <img src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  );
};

export default Navbar;

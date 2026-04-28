import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { useContext } from "react";
import { AppContent } from "../context/AppContext.jsx";
import { toast } from "react-toastify";
import axios from 'axios'

const Navbar = () => {
  const navigate = useNavigate();
   const { userData, backendUrl, setUserData, setIsLoggedin } =
     useContext(AppContent);

    const sendVerificationOtp = async () => {
      try {
        axios.defaults.withCredentials = true;

        // ⚓ Added {} as the second argument
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
        // This will now show "Network Error" if the URL or CORS is wrong
        toast.error(error.message);
      }
    };


   const logout = async () => {
     try {
       // 1. Fix typo: 'defaults' (plural) not 'default'
       axios.defaults.withCredentials = true;

       const { data } = await axios.post(backendUrl + "/api/auth/logout");

       if (data.success) {
         // 2. Use the exact names from your AppContext
         setIsLoggedin(false);
         setUserData(false);

         
         navigate("/");
       }
     } catch (error) {
       // 3. Capture specific server error messages
       toast.error(error.response?.data?.message || error.message);
     }
   };


  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img src={assets.logo} alt=" Logo" className="w-28 sm:w-32" />

      {userData ? (
        /* This is the part that was broken */
        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group">
          {userData.name[0].toUpperCase()}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 rounded, pt-10 text-black">
            <ul className="list-none m-0 p2 bg-gray-100 text-sm">
              {!userData.isAccountVerified && (
                <li onClick={sendVerificationOtp} className="py-1 px-2 hover:bg-gray-200 cursor-pointer">
                  Verify email
                </li>
              )} 

              <li onClick={logout} className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10">
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        /* This is the false case */
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-500 px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all rounded-3xl"
        >
          Login <img src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  );
};

export default Navbar;

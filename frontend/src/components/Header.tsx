// import { useState,useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {toast} from 'react-toastify'
// import { logout } from "../api/auth/UserAuthentication";
// import { useDispatch } from "react-redux";
// import { setUser,clearUserDetails } from "../redux/slices/userSlice";


// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   useEffect(()=>{
//     const userDataString = localStorage.getItem('user')
//     if(userDataString){
//       try{
//         const userData = JSON.parse(userDataString)

//         if(userData?.email){
//           dispatch(setUser({
//             userId:userData.userId,
//             name:userData.name,
//             email:userData.email,
//             role:userData.role,
//             isBlocked:userData.isBlocked,
//             profilePicture:userData.profilePicture
//           }))
//         }
//       }catch(error){
//         console.log('error parsing user data from localStorage',error)
//       }
//     }
//   },[dispatch])
  
//   const hadleLogout = async () => {
//     try {
//       await logout()
//       dispatch(clearUserDetails())
//       toast.success("logged out successfully")
//       navigate("/user/login")
//     } catch (error) {
//       console.error('error during logout')
//       toast.error("failed to logout.please try again")
//     }
//   }


//   return (
//     <header className="bg-blue-600 text-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
//         {/* Logo */}
//         <div className="text-2xl font-bold">Ulearn</div>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex space-x-6 font-bold">
//           <a href="/" className="hover:text-gray-300">Home</a>
//           <a href="#" className="hover:text-gray-300">Courses</a>
//           <a href="#" className="hover:text-gray-300">Mentors</a>
//           <a href="#" className="hover:text-gray-300">About Us</a>
//         </nav>

//         {/* Desktop Buttons */}
//         <div className="hidden md:flex space-x-4 font-bold">
//           <button className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-200">Login</button>
//           <button className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-200" onClick={()=>navigate('/enrollPage')}>Sign Up</button>
//         </div>

//         {/* Mobile menu button */}
//         <div className="md:hidden">
//           <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
//               viewBox="0 0 24 24">
//               <path d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden px-4 pb-4 space-y-2 font-bold">
//           <a href="" className="block hover:text-gray-300">Home</a>
//           <a href="#" className="block hover:text-gray-300">Courses</a>
//           <a href="#" className="block hover:text-gray-300">Mentors</a>
//           <a href="#" className="block hover:text-gray-300">About Us</a>
//           <button className="w-full mt-2 bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-200">Login</button>
//           <button className="w-full bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-200" onClick={()=>navigate('/enrollPage')}>Sign Up</button>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../api/auth/UserAuthentication";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { clearUserDetails } from "../redux/slices/userSlice";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  const handleLogout = async () => {
    try {
      await logout(); // call your backend logout API
      dispatch(clearUserDetails());
      toast.success("Logged out successfully");
      navigate("/user/login");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/")}>
          Ulearn
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 font-semibold">
          <a href="/" className="hover:text-gray-300">Home</a>
          <a href="#" className="hover:text-gray-300">Courses</a>
          <a href="#" className="hover:text-gray-300">Mentors</a>
          <a href="#" className="hover:text-gray-300">About Us</a>
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center space-x-4">
          {!user.email ? (
            <>
              <button
                onClick={() => navigate("/user/login")}
                className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/enrollPage")}
                className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <img
                src={user.profilePicture || "/default-avatar.png"}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span>{user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 font-semibold">
          <a href="/" className="block hover:text-gray-300">Home</a>
          <a href="#" className="block hover:text-gray-300">Courses</a>
          <a href="#" className="block hover:text-gray-300">Mentors</a>
          <a href="#" className="block hover:text-gray-300">About Us</a>
          {!user.email ? (
            <>
              <button
                className="w-full bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100"
                onClick={() => navigate("/user/login")}
              >
                Login
              </button>
              <button
                className="w-full bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100"
                onClick={() => navigate("/enrollPage")}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-2 mt-2">
                <img
                  src={user.profilePicture || "/default-avatar.png"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span>{user.name}</span>
              </div>
              <button
                className="w-full bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100 mt-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;

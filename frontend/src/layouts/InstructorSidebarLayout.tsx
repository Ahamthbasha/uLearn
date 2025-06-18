import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearInstructorDetails } from "../redux/slices/instructorSlice";
import { logout } from "../api/auth/InstructorAuthentication";

const navItems = [
  { name: "Dashboard", path: "/instructor/dashboard", icon: "📊" },
  { name: "Create Course", path: "/instructor/create-course", icon: "📚" },
  { name: "My Courses", path: "/instructor/courses", icon: "📖" },
  { name: "Slots", path: "/instructor/slots", icon: "📅" },
  { name: "Meetings", path: "/instructor/meetings", icon: "🎥" },
  { name: "Students", path: "/instructor/students", icon: "👥" },
  { name: "Analytics", path: "/instructor/analytics", icon: "📈" },
  { name: "Settings", path: "/instructor/profile", icon: "⚙️" },
];

const InstructorSidebarLayout = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const username = (user?.name || "Instructor").toUpperCase();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(clearInstructorDetails());
      toast.success("Logged out successfully");
      navigate("/instructor/login");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-xl flex flex-col relative overflow-hidden">
        {/* Decorative background gradient */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-amber-500 to-orange-500 opacity-5"></div>

        {/* Logo Header */}
        <div className="relative flex items-center justify-center h-20 border-b border-gray-100 cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent tracking-wide">
              ULearn
            </span>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">👨‍🏫</span>
            </div>
            <div>
              <p className="font-semibold text-gray-800">{username}</p>
              <p className="text-xs text-gray-500">Instructor</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-6 flex-1">
          <h2 className="text-xs text-gray-400 uppercase mb-6 tracking-widest font-semibold">
            Navigation
          </h2>
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-200 ease-in-out ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg transform scale-105"
                      : "text-gray-600 hover:bg-gray-50 hover:text-amber-600 hover:transform hover:scale-105"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="text-xl group-hover:animate-pulse">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.name}</span>
                    <div
                      className={`ml-auto w-2 h-2 rounded-full transition-all duration-200 ${
                        isActive
                          ? "bg-white"
                          : "bg-transparent group-hover:bg-amber-400"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-6 border-t border-gray-100 space-y-4">
          {/* Motivational Quote */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-100 rounded-xl p-4">
            <p className="italic text-gray-600 text-sm">
              "Teaching is the profession that teaches all the other professions."
            </p>
            <p className="text-right mt-2 text-xs text-gray-500">– Unknown</p>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 py-2 px-4 rounded-lg transition duration-200"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default InstructorSidebarLayout;
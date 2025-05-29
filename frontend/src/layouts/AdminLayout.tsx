import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  GraduationCap,
  ShieldCheck,
  ShoppingCart,
  BadgePercent,
  LogOut
} from 'lucide-react';
import { adminLogout } from '../api/auth/AdminAuthentication';

import {toast} from 'react-toastify'

const AdminLayout = () =>{

    const navigate =useNavigate()

    const handleLogout = async () => {
  try {
    const response = await adminLogout();
    if (response.success) {
      localStorage.removeItem("admin");
      toast.success("Logged out successfully");
      navigate("/admin/login");
    } else {
      toast.error(response.message || "Logout failed");
    }
  } catch (error) {
    console.error("Logout error:", error);
    toast.error("Logout failed. Please try again.");
  }
};
  const location = useLocation();
  const isActive = (path : string) => location.pathname.includes(path);

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard />, path: 'dashboard' },
    { name: 'Courses', icon: <BookOpen />, path: 'courses' },
    { name: 'Users', icon: <Users />, path: 'users' },
    { name: 'Instructors', icon: <GraduationCap />, path: 'instructors' },
    { name: 'Verification', icon: <ShieldCheck />, path: 'verification' },
    { name: 'Orders', icon: <ShoppingCart />, path: 'orders' },
    { name: 'Membership', icon: <Users />, path: 'membership' },
    { name: 'Coupons', icon: <BadgePercent />, path: 'coupons' }
  ];

  return (
    <div className="flex min-h-screen bg-[#0F172A] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1E293B] p-6 flex flex-col justify-between shadow-xl">
        <div>
          <h1 className="text-2xl font-bold mb-10 text-center text-indigo-400">ulearn Admin</h1>
          <nav className="space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={`/admin/${item.path}`}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-indigo-600 ${
                  isActive(item.path) ? 'bg-indigo-600' : 'bg-[#1E293B]'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors duration-300"
          >
            <LogOut />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-[#0F172A] p-10 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout
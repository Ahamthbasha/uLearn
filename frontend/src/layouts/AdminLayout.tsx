import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  TreePine,
  Image,
  CreditCard,
  Crown,
  BadgePercent,
  ShieldCheck,
  ShoppingCart,
  LogOut,
  Menu
} from 'lucide-react';
import { toast } from 'react-toastify';
import { adminLogout } from '../api/auth/AdminAuthentication';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => location.pathname.includes(path);
  
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard />, path: 'dashboard' },
    { name: 'Users', icon: <Users />, path: 'users' },
    { name: 'Instructors', icon: <GraduationCap />, path: 'instructors' },
    { name: 'Courses', icon: <BookOpen />, path: 'courses' },
    { name: 'Category', icon: <TreePine />, path: 'category' },
    { name: 'Banner', icon: <Image />, path: 'banner' },
    { name: 'Verification', icon: <ShieldCheck />, path: 'verification' },
    { name: 'Order Management', icon: <ShoppingCart />, path: 'order-management' },
    { name: 'Wallet Transaction', icon: <CreditCard />, path: 'wallet-transaction' },
    { name: 'Membership', icon: <Crown />, path: 'membership' },
    { name: 'Coupon', icon: <BadgePercent />, path: 'coupon' }
  ];
  
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

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(59, 130, 246, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(249, 115, 22, 0.6);
          border-radius: 3px;
          transition: background 0.3s ease;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(249, 115, 22, 0.8);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(249, 115, 22, 0.6) rgba(59, 130, 246, 0.1);
        }
      `}</style>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <Menu size={20} className="text-blue-700" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-72 bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-900 shadow-2xl transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 lg:translate-x-0 lg:static flex flex-col`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-blue-700/30 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">U</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                ULearn
              </h1>
              <p className="text-blue-200 text-sm font-medium">E-Learning Platform</p>
            </div>
          </div>
        </div>

        {/* Navigation - Scrollable Section */}
        <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={`/admin/${item.path}`}
                onClick={() => setSidebarOpen(false)}
                className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-white/10 hover:shadow-lg ${
                  isActive(item.path) 
                    ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20' 
                    : 'text-blue-100 hover:text-white'
                }`}
              >
                <span className={`transition-colors duration-200 ${
                  isActive(item.path) ? 'text-orange-300' : 'text-blue-300 group-hover:text-orange-300'
                }`}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-blue-700/30 flex-shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 min-h-screen overflow-y-auto custom-scrollbar">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
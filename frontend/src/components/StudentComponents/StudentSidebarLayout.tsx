// src/components/layouts/StudentSidebarLayout.tsx
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/user/dashboard" },
  { name: "Courses", path: "/user/courses" },
  { name: "Meetings", path: "/user/meetings" },
  { name: "Wishlist", path: "/user/wishlist" },
  { name: "Cart", path: "/user/cart" },
  { name: "Settings", path: "/user/profile" },
];

const StudentSidebarLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">My Account</h2>
        </div>
        <nav className="flex flex-col gap-3">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-medium"
                  : "text-gray-700 hover:text-blue-500"
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Page content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentSidebarLayout;

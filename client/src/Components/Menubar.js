import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  logo,
  dashboard,
  home,
  user,
  showcase,
  settings,
  role,
  market,
  content,
  customer,
  logout,
} from "../Assets/index";

const Menubar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: dashboard, link: "/dashboard" },
    { name: "Team & Access", icon: user, link: "/user-management" },
    { name: "Customer Management", icon: customer, link: "/customer-management" },
    { name: "Add Insights", icon: content, link: "/content-management" },
    { name: "Showcase Management", icon: showcase, link: "/showcase-management" },
    { name: "On-Demand Services", icon: home, link: "/home-service" },
    { name: "Business Network", icon: market, link: "/market-place" },
    { name: "Roles & Permissions", icon: role, link: "/role-management" },
    { name: "Company Profile", icon: settings, link: "/settings" },
  ];

  return (
    <aside
      className="
        fixed top-0 left-0
        h-screen w-64
        bg-white
        shadow-md
        flex flex-col justify-between
        z-30
      "
    >
      {/* Logo Section */}
      <div className="flex items-center justify-center pt-6 pb-4 border-b border-gray-200">
        <img src={logo} alt="Company Logo" className="h-16 object-contain" />
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto px-4 mt-4">
        <h2 className="text-gray-400 uppercase text-xs font-semibold px-2 mb-2">
          Menu
        </h2>
        <nav className="flex flex-col space-y-1">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.link;

            return (
              <Link
                key={index}
                to={item.link}
                className={`flex items-center px-4 py-3 rounded-md font-medium transition duration-200 ${
                  isActive
                    ? "bg-lime-100 text-lime-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-lime-500"
                }`}
              >
                <img src={item.icon} alt={item.name} className="h-5 w-5 mr-3" />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div
        className="
          flex items-center justify-center
          bg-red-50 hover:bg-red-100
          text-red-500 py-4 cursor-pointer
          border-t border-gray-200 transition duration-200
        "
        onClick={() => (window.location.href = "/")}
      >
        <img src={logout} alt="Logout" className="h-5 w-5 mr-2" />
        <span className="font-semibold text-sm">Logout</span>
      </div>
    </aside>
  );
};

export default Menubar;

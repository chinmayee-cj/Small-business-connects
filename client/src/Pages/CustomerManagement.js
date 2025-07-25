import React, { useState } from "react";
import Menubar from "../Components/Menubar";
import MenuToggle from "../Components/MenuToggle";
import Navbar from "../Components/Navbar";

const CustomerManagement = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Sidebar */}
      <div
        className={`w-64 bg-gradient-to-b from-yellow-50 via-lime-100 to-emerald-100 shadow-md border-r border-gray-200 transition-all duration-300 ease-in-out ${
          showMenu ? "block" : "hidden"
        } lg:block`}
      >
        <Menubar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar pagename="Business Network" />
        <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />

        <div className="px-6 py-8 max-w-6xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Manage Connected Businesses
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              This section allows you to view, connect, and manage businesses in your network.
              You can onboard partners, communicate, and establish collaboration workflows.
            </p>

            {/* Placeholder for future dynamic content */}
            <div className="mt-8 text-gray-500 italic">
              Connected business directory or collaboration tools will appear here.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerManagement;
// © 2025 Chinmayee C J. All rights reserved.

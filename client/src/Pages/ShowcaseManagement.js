import React, { useState } from "react";
import Menubar from "../Components/Menubar";
import MenuToggle from "../Components/MenuToggle";
import Navbar from "../Components/Navbar";

const ShowcaseManagement = () => {
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

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />
        <Navbar pagename="Business Portfolio" />

        <div className="px-6 py-8 max-w-6xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Showcase Your Services
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Use this section to create and manage the public-facing portfolio of your business.
              Add service descriptions, images, and categories that highlight what your business offers.
            </p>

            {/* Placeholder for portfolio content */}
            <div className="mt-8 text-gray-500 italic">
              Business portfolio content (cards or uploads) will be displayed here.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseManagement;

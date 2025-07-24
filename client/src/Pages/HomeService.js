import React, { useState } from "react";
import Menubar from "../Components/Menubar";
import MenuToggle from "../Components/MenuToggle";
import Navbar from "../Components/Navbar";

const HomeService = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Sidebar */}
      <div
        className={`w-64 bg-gradient-to-b from-yellow-50 via-lime-100 to-emerald-100 shadow-md border-r border-gray-200 ${
          showMenu ? "block" : "hidden"
        } lg:block`}
      >
        <Menubar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />
        <Navbar pagename="On-Demand Services" />

        <div className="px-6 py-8 max-w-6xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Manage Your On-Demand Service Offerings
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              This section handles the services you offer directly to customers — such as home repairs, cleaning, personal care, and more. 
              Use it to curate, list, and manage your service areas and staff connectivity.
            </p>

            {/* Placeholder for dynamic service data */}
            <div className="mt-8 text-gray-500 italic">
              Service list, request management or controls will be displayed here.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeService;

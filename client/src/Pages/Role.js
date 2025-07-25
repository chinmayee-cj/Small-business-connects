import React, { useState } from "react";
import Menubar from "../Components/Menubar";
import MenuToggle from "../Components/MenuToggle";
import Navbar from "../Components/Navbar";
import UsersTable from "../Components/Table";

const Role = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans text-gray-800">
      {/* Sidebar */}
      <div
        className={`w-64 bg-gray-100 border-r border-gray-200 transform duration-300 ease-in-out ${
          showMenu ? "block" : "hidden"
        } lg:block`}
      >
        <Menubar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar pagename={"Permission and Role Management"} />
        <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />

        <div className="px-6 py-6">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Assigned Roles Overview
            </h2>
            <UsersTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Role;
// © 2025 Chinmayee C J. All rights reserved.

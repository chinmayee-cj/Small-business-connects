import React, { useState, useEffect } from "react";
import Menubar from "../Components/Menubar";
import MenuToggle from "../Components/MenuToggle";
import Navbar from "../Components/Navbar";

const MarketPlace = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [companies, setCompanies] = useState([]);

  const handleMenuToggle = () => setShowMenu(!showMenu);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const data = await response.json();
        if (data.success) {
          setCompanies(data.data);
        } else {
          console.error("Error fetching users:", data.message);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchCompanies();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Sidebar */}
      <Menubar />

      {/* Main content area */}
      <div className="flex-1 bg-lime-50 ml-64 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <div className="h-20 bg-white shadow-md">
          <Navbar pagename={"Market Place Management"} />
        </div>

        {/* Menu Toggle for mobile */}
        <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />

        {/* Content section */}
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <div
                key={company._id}
                className="bg-white rounded-xl shadow-sm p-5 flex flex-col items-center justify-between border hover:shadow-md transition"
              >
                {company.logo ? (
                  <img
                    src={`http://localhost:5000/uploads/${company.logo}`}
                    alt={`${company.name} logo`}
                    className="w-24 h-24 object-contain mb-4 rounded"
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/100"
                    alt="Default placeholder"
                    className="w-24 h-24 object-contain mb-4 opacity-60 rounded"
                  />
                )}
                <h3 className="text-lg font-semibold mb-1 text-center text-gray-800">
                  {company.name}
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  Email: {company.email}
                </p>
                <p className="text-sm text-gray-600 text-center mb-3">
                  Domain: {company.role}
                </p>
                <div className="flex gap-3">
                  <button className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    Go to Stats
                  </button>
                  <button className="px-4 py-1 bg-gray-200 text-black rounded hover:bg-gray-300 transition">
                    Follow
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;
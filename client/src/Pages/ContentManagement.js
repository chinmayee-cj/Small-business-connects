import React, { useState } from "react";
import Menubar from "../Components/Menubar";
import MenuToggle from "../Components/MenuToggle";
import Navbar from "../Components/Navbar";

const initialForm = {
  date: "",
  revenue: "",
  usersReached: "",
  bookings: "",
  cancellations: "",
  totalActivity: "",
  cost: "",
  profit: "",
  notes: "",
};

const ContentManagement = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [form, setForm] = useState(initialForm);

  const handleMenuToggle = () => setShowMenu(!showMenu);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId") || "687a5baa991ea17e3f173e4e";
    const payload = { ...form, userId };

    try {
      const response = await fetch("/api/analysis-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Business data saved!");
        setForm(initialForm);
      } else {
        const err = await response.json();
        alert("Error: " + (err.message || "Unknown error"));
      }
    } catch (error) {
      alert("Server error: " + error.message);
    }
  };

  return (
    <div className="flex min-h-screen font-sans text-gray-800 bg-gray-50">
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
        <Navbar pagename={"Content Management"} />
        <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />

        <div className="max-w-2xl mx-auto w-full p-8 mt-8">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-8"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">
              Enter Your Business Data
            </h2>

            {/* Form Fields */}
            {[
              { name: "date", label: "Date", type: "date" },
              { name: "revenue", label: "Revenue Generated", type: "number" },
              { name: "usersReached", label: "Users Reached", type: "number" },
              { name: "bookings", label: "Bookings", type: "number" },
              { name: "cancellations", label: "Cancellations", type: "number" },
              { name: "totalActivity", label: "Total Activity", type: "number" },
              { name: "cost", label: "Cost", type: "number" },
              { name: "profit", label: "Profit", type: "number" },
            ].map((field) => (
              <div key={field.name} className="mb-5">
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={form[field.name]}
                  onChange={handleChange}
                  required
                  min={field.type === "number" ? "0" : undefined}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
                />
              </div>
            ))}

            {/* Notes Field */}
            <div className="mb-6">
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={form.notes}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-lime-400"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-right">
              <button
                type="submit"
                className="bg-lime-500 text-white text-sm font-semibold px-6 py-3 rounded-md hover:bg-lime-600 transition duration-200 shadow"
              >
                Save Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;

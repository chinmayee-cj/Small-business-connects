import React, { useEffect, useState } from "react";
import Menubar from "../Components/Menubar";
import MenuToggle from "../Components/MenuToggle";
import Navbar from "../Components/Navbar";
import axios from "axios";

const Settings = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState({});
  const [logo, setLogo] = useState(null);
  const [certificate, setCertificate] = useState(null);

  const handleMenuToggle = () => setShowMenu(!showMenu);

  const userId = JSON.parse(localStorage.getItem("user"))?._id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/users/me?id=${userId}`);
        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    if (userId) fetchUser();
  }, [userId]);

  const handleUpload = async () => {
    if (!userId) return;

    try {
      if (logo) {
        const logoFormData = new FormData();
        logoFormData.append("logo", logo);
        await axios.post(`/api/users/upload-logo/${userId}`, logoFormData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (certificate) {
        const certFormData = new FormData();
        certFormData.append("certificate", certificate);
        await axios.post(
          `/api/users/upload-certificate/${userId}`,
          certFormData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }

      const res = await axios.get(`/api/users/me?id=${userId}`);
      setUser(res.data);

      alert("Upload successful!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
    }
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

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Navbar pagename="Settings" />
        <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />

        <div className="p-8 max-w-3xl mx-auto">
          <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Company Settings
            </h2>

            {/* Company Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Company Name
                </label>
                <div className="mt-1 text-gray-800">{user.name || "N/A"}</div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <div className="mt-1 text-gray-800">{user.email || "N/A"}</div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Domain</label>
                <div className="mt-1 text-gray-800">{user.role || "N/A"}</div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Company ID
                </label>
                <div className="mt-1 text-gray-800">
                  {user.companyID || "N/A"}
                </div>
              </div>
            </div>

            <hr className="my-6 border-gray-300" />

            {/* Uploads */}
            <div className="space-y-6">
              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Upload Company Logo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-200 file:rounded-md file:bg-gray-100 file:text-gray-700 hover:file:bg-lime-100"
                  onChange={(e) => setLogo(e.target.files[0])}
                />
                {user.logo && (
                  <img
                    src={`/uploads/${user.logo}`}
                    alt="Company Logo"
                    className="mt-2 h-24 object-contain rounded border border-gray-200"
                  />
                )}
              </div>

              {/* Certificate Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Upload Company Certificate
                </label>
                <input
                  type="file"
                  className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-200 file:rounded-md file:bg-gray-100 file:text-gray-700 hover:file:bg-lime-100"
                  onChange={(e) => setCertificate(e.target.files[0])}
                />
                {user.certificate && (
                  <a
                    href={`/uploads/${user.certificate}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm text-blue-600 underline"
                  >
                    View Uploaded Certificate
                  </a>
                )}
              </div>
            </div>

            {/* Upload Button */}
            <div className="mt-8 text-right">
              <button
                onClick={handleUpload}
                className="bg-lime-500 hover:bg-lime-600 text-white font-semibold px-6 py-3 rounded-md shadow transition"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
// © 2025 Chinmayee C J. All rights reserved.

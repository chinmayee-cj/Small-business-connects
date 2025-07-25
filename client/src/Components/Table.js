import React, { useEffect, useState } from "react";
import axios from "axios";
import { see, remove, change, search } from "../Assets/index";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState({});

  const updateStatus = (id) => {
    setStatus((prev) => ({ ...prev, [id]: "Complete" }));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data.data);
    };
    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user._id !== id));
  };

  return (
    <div className="px-6 py-4">
      {/* Search & Action Row */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400"
            onChange={handleSearch}
          />
          <img
            src={search}
            alt="search"
            className="absolute top-3 left-4 w-5 h-5 opacity-60 pointer-events-none"
          />
        </div>
        <button className="bg-lime-500 hover:bg-lime-600 text-white font-semibold py-3 px-8 rounded-md shadow transition">
          Add New Role
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4 border-b">S.No</th>
              <th className="px-6 py-4 border-b">Company Name</th>
              <th className="px-6 py-4 border-b">Email Address</th>
              <th className="px-6 py-4 border-b">Domain</th>
              <th className="px-6 py-4 border-b">Status</th>
              <th className="px-6 py-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredUsers.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50 border-b transition duration-150"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                      status[user._id] === "Complete"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {status[user._id] || "Assign"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={change}
                      alt="change"
                      className="w-5 h-5 cursor-pointer hover:scale-110 transition"
                      onClick={() => updateStatus(user._id)}
                    />
                    <img
                      src={see}
                      alt="see"
                      className="w-5 h-5 cursor-pointer hover:scale-110 transition"
                    />
                    <img
                      src={remove}
                      alt="remove"
                      className="w-5 h-5 cursor-pointer hover:scale-110 transition"
                      onClick={() => handleDelete(user._id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-gray-500 italic"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
// © 2025 Chinmayee C J. All rights reserved.

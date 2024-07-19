import React, { useState } from "react";
import Role from "../common/Role";

const RoleChangeModal = ({ isOpen, onClose, onSubmit, user }) => {
  const [userRole, setUserRole] = useState("");
  
  if (!isOpen) return null;

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newRole = e.target.role.value;
    onSubmit(user._id, newRole);
  };

  const handleRoleChange = (e) => {
    setUserRole(e.target.value); // Update userRole state when the select value changes
  };

  return (
    <div
      id="static-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-full max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Change Role for {user.name}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <div className="mb-4">
              <p className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                User Name: {user.name}
              </p>
              <p className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                Email: {user.email}
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                >
                  New Role
                </label>
                <select
                  id="role"
                  name="role"
                  className="mt-1 h-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                  value={userRole} // Set the selected value of the select element
                  onChange={handleRoleChange} // Handle select value changes
                >
                  {Object.values(Role).map((el) => (
                    <option value={el} key={el}>
                      {el}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center">
                <button
                  type="submit"
                  className="w-full text-white bg-red-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Change Role
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleChangeModal;

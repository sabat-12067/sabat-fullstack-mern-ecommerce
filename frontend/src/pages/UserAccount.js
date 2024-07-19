import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import UserEdit from "../components/UserEdit";

const UserAccount = () => {
  const user = useSelector((state) => state?.user?.user);
  const [editUser, setEditUser] = useState(false);

  return (
    <div className="container ms-auto p-4 relative">
      {/* Edit Button */}
      <div className="relative">
        <div className="absolute right-2 top-2">
          <button
            className="w-fit ml-auto p-2 bg-blue-500 rounded-full text-white hover:bg-blue-900 transition-all cursor-pointer"
            onClick={() => setEditUser(true)}
          >
            <FaEdit />
          </button>
        </div>
      </div>

      {/* User Details */}
      <div className="flex flex-col mt-16 items-center justify-center w-full sm:w-full h-full">
        <div className="h-56 flex justify-center items-center flex-col">
          {/* User Profile Image */}
          <div className="text-xl flex justify-center">
            {user?.profilepic ? (
              <img
                src={user?.profilepic}
                className="w-32 h-32 rounded-full"
                alt={user?.name}
              />
            ) : (
              <FaCircleUser className="w-32 h-32 rounded-full" />
            )}
          </div>
          <h2 className="capitalize font-bold text-3xl mt-4">
            Name: {user?.name}
          </h2>
          <div className="flex flex-col">
            <h2 className="font-bold text-xl mt-4">Email: {user?.email}</h2>
            <h2 className="font-bold text-xl mt-4">Contact: {user?.contact}</h2>
          </div>
        </div>
      </div>
      {editUser && <UserEdit onClose={() => setEditUser(false)} />}
    </div>
  );
};

export default UserAccount;

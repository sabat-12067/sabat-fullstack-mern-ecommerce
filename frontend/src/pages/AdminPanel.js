import React, { useEffect } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/Role";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="max-h-[calc(100vh-70px)] flex">
      <aside className="bg-slate-600 min-h-[calc(100vh-160px)] w-full max-w-64 m-5 rounded-lg text-white text-center customShadow overflow-y-auto">
        <div className="h-48 flex justify-center items-center flex-col">
          <div className="text-4xl cursor-pointer relative flex justify-center">
            {user?.profilepic ? (
              <img
                src={user?.profilepic}
                className="w-14 h-14 rounded-full"
                alt={user?.name}
              />
            ) : (
              <FaCircleUser />
            )}
          </div>
          <h2 className="capitalize font-bold text-3xl">
            {user?.name ? user?.name : "Admin"}
          </h2>
          <p className="text-sm">Role : {user?.role ? user?.role : "USER"}</p>
        </div>

        {/* Navigation Link for Admin */}
        <div>
          <nav className="grid gap-1">
            <Link
              to="all-users"
              className="p-1 text-2xl font-bold flex items-center justify-center"
            >
              All Users
            </Link>
            <Link
              to="all-products"
              className="p-1 text-2xl font-bold flex items-center justify-center"
            >
              Products
            </Link>
            {/* <Link
              to="add-products"
              className="p-1 text-2xl font-bold flex items-center justify-center"
            >
              Add Products
            </Link> */}
          </nav>
        </div>
      </aside>

      <main className="w-full max-h-[calc(100vh-70px)] m-5 bg-slate-100 rounded overflow-y-auto custom-scrollbar">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;

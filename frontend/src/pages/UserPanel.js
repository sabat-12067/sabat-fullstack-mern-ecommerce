import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaHeart, FaBars, FaShoppingCart } from "react-icons/fa";
import { RiFolderUploadFill } from "react-icons/ri";
import { BsPersonCircle } from "react-icons/bs";
import { FaCircleUser } from "react-icons/fa6";
import { FaWindowClose } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa";
import SummaryApi from "../common/API";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";

const UserPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleLogout = async () => {
    const fetchDate = await fetch(SummaryApi.userLogout.url, {
      method: SummaryApi.userLogout.method,
      credentials: "include",
    });

    const data = await fetchDate.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  return (
    <div className="flex sm:flex-row max-h-[calc(100vh-70px)] flex-col p-4 gap-4">
      <div className="cursor-pointer p-2 md:hidden" onClick={toggleSidebar}>
        <FaBars />
      </div>
      {/* sidebar */}
      <aside
        className={`bg-slate-400 min-h-[calc(100vh-160px)] w-full max-w-64 m-4 rounded-lg text-white text-center relative customShadow overflow-y-auto ${
          isSidebarVisible ? "block" : "hidden"
        } sm:block`}
      >
        <div
          className="right-1 top-1 cursor-pointer p-1 absolute md:hidden"
          onClick={toggleSidebar}
        >
          <FaWindowClose className="text-xl" />
        </div>
        <div className="h-52 flex justify-center items-center flex-col">
          <div className="text-xl flex justify-center">
            {user?.profilepic ? (
              <img
                src={user?.profilepic}
                className="w-24 h-24 rounded-full"
                alt={user?.name}
              />
            ) : (
              <FaCircleUser />
            )}
          </div>
          <h2 className="capitalize font-bold text-3xl">
            {user?.name ? user?.name : "Admin"}
          </h2>
        </div>

        {/* Navigation Link for Admin */}
        <div className="px-8">
          <nav className="grid gap-1 text-left">
            <Link
              to="my-account"
              className="p-2 text-2xl font-semibold flex items-center gap-2 text-white hover:text-slate-900"
            >
              <BsPersonCircle /> Profile
            </Link>
            <Link
              to="wishlist"
              className="p-2 text-2xl font-semibold flex items-center gap-2 text-white hover:text-slate-900"
            >
              <FaHeart />
              Wishlist
            </Link>
            <Link
              to="cart"
              className="p-2 text-2xl font-semibold flex items-center gap-2 text-white hover:text-slate-900"
            >
              <FaShoppingCart />
              Carts
            </Link>
            <Link
              to="my-orders"
              className="p-2 text-2xl font-semibold flex items-center gap-2 text-white hover:text-slate-900"
            >
              <RiFolderUploadFill /> Orders
            </Link>
            <Link
              to="my-orders"
              className="p-2 text-2xl font-semibold flex items-center gap-2 text-red-500 hover:text-red-900"
              onClick={handleLogout}
              // onClick={toggleSidebar}
            >
              <FaPowerOff />
              Sign Out
            </Link>
          </nav>
        </div>
      </aside>
      {/* content */}
      <main
        className={`bg-slate-200 min-h-[calc(100vh-130px)] sm:max-h-[calc(100vh-210px)] w-full m-4 rounded overflow-y-scroll custom-scrollbar ${
          isSidebarVisible ? "hidden" : "block"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default UserPanel;

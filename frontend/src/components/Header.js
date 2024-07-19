import { GrSearch } from "react-icons/gr";
import { FaCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import React, { useContext, useEffect, useState } from "react";
import Logo from "./Logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common/API";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/Role";
import { useCart } from "../context/CartContext";
import { FaHeart } from "react-icons/fa";
import Context from "../context/Context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);

  const [menuDisplay, setMenuDisplay] = useState(false);
  const { cartCount, countCartProducts } = useCart();

  const context = useContext(Context);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const urlSearch = new URLSearchParams(location?.search);
  const searchQuery = urlSearch.getAll("q");
  const [searchValue, setSearchValue] = useState(searchQuery);

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

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/");
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-6 justify-between">
        {/* Logo Div */}
        <div>
          <Link to={"/"}>
            <Logo w={100} h={60} />
          </Link>
        </div>
        {/* Logo Div Ends*/}

        {/* Search Bar */}
        <div className="hidden md:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2">
          <input
            type="text"
            placeholder="Search for products, brands and more..."
            className="w-full outline-none"
            value={searchValue}
            onChange={handleSearch}
          />
          <div className="text-lg text-white min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full">
            <GrSearch />
          </div>
        </div>
        {/* Search Bar Ends*/}

        <div className="flex items-center gap-7">
          {/* User Profile View */}
          <div className="relative group flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.profilepic ? (
                  <img
                    src={user?.profilepic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaCircleUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  {user?.role === ROLE.ADMIN ? (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap hover:bg-slate-200 rounded p-2"
                      onClick={() => setMenuDisplay((prev) => !prev)}
                    >
                      Admin Panel
                    </Link>
                  ) : (
                    <Link
                      to={"/user-panel/my-account"}
                      className="whitespace-nowrap hover:bg-slate-200 rounded p-2"
                      onClick={() => setMenuDisplay((prev) => !prev)}
                    >
                      My Account
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>
          {/* User Profile View End*/}

          {/** WishList Items */}
          {user?._id && user?.role === ROLE.USER && (
            <Link
              to={"/user-panel/wishlist"}
              className="text-2xl relative flex justify-center"
            >
              <span>
                <FaHeart />
              </span>
              <div className="bg-red-600 text-white w-5 h-5 p-1 flex items-center justify-center rounded-full absolute -top-2 -right-2">
                <p className="text-xs font-semibold ">
                  {context.wishListProductCount}
                </p>
              </div>
            </Link>
          )}

          {/* Cart Div */}
          {user?._id && user?.role === ROLE.USER && (
            <Link to={"/user-panel/cart"} className="text-2xl relative flex justify-center">
              <span>
                <FaShoppingCart />
              </span>
              <div className="bg-red-600 text-white w-5 h-5 p-1 flex items-center justify-center rounded-full absolute -top-2 -right-2">
                <p className="text-xs">{cartCount}</p>
              </div>
            </Link>
          )}
          {/* Cart Div Ends*/}

          {/* SignIn & SignOut Button */}
          <div>
            {user?._id ? (
              <button
                className="px-3 h-8 bg-red-600 rounded-full text-white hover:bg-red-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link to={"signin"}>
                <button className="px-3 h-8 bg-red-600 rounded-full text-white hover:bg-red-700">
                  Sign In
                </button>
              </Link>
            )}
          </div>
          {/* SignIn & SignOut Button Ends*/}
        </div>
      </div>
    </header>
  );
};

export default Header;

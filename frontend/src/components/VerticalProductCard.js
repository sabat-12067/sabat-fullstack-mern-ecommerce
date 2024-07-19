import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINR from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAddToCart from "../helpers/AddToCart";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SummaryApi from "../common/API";
import AddToWishList from "../helpers/AddToWishlist";
import DeleteToWishList from "../helpers/DeleteWishListProduct";
import context from "../context/Context";

const VerticalProductCard = ({ category, heading }) => {
  const user = useSelector((state) => state?.user?.user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const scrollElement = useRef();
  const addToCart = useAddToCart();
  const { fetchAddToWishListCount } = useContext(context);

  const handleWishlistToggle = async (e, productId) => {
    e.preventDefault();

    const wishlistItem = getWishlistItemByProductId(productId);
    if (wishlistItem) {
      await DeleteToWishList(e, wishlistItem._id);
      // toast.success("Removed from Wishlist");
    } else {
      await AddToWishList(e, productId);
      // toast.success("Added to Wishlist");
    }
    fetchAddToWishListCount();
    fetchWishlist();
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await fetchCategoryWiseProduct(category);
      setData(result.product); // Ensure result.product is the correct path
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  const fetchWishlist = async () => {
    if (user?._id) {
      try {
        const response = await fetch(SummaryApi.getWishList.url, {
          method: SummaryApi.getWishList.method,
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
        });
        const result = await response.json();
        if (result.success) {
          setWishlist(result.data);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    }
  };
  console.log("WishList",wishlist)

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  const getWishlistItemByProductId = (productId) => {
    return wishlist.find((item) => item?.productId?._id === productId);
  };

  const isProductInWishlist = (productId) => {
    return Boolean(getWishlistItemByProductId(productId));
  };

  return (
    <div className="px-10 my-4 mx-auto relative">
      <h1 className="text-3xl font-semibold py-4">{heading}</h1>

      <div
        className="flex items-center gap-2 md:gap-6 overflow-x-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className="bg-slate-200 rounded-full absolute left-1 shadow-md p-3 mx-10 text-xl hidden md:block hover:scale-150 transition-all"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-slate-100 rounded-full absolute right-1 shadow-md p-3 mx-10 text-xl hidden md:block hover:scale-150 transition-all"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {loading
          ? Array.from({ length: 13 }).map((_, index) => (
              <div
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow"
                key={index}
              >
                <div className="bg-slate-200 flex justify-center items-center p-4 h-48 min-w-[120px] md:min-w-[150px] animate-pulse"></div>
                <div className="p-4 gap-2 flex flex-col justify-between w-full">
                  <h2 className="text-lg font-semibold text-ellipsis line-clamp-1 text-black p-1 py-2 bg-slate-200 animate-pulse rounded-full"></h2>
                  <p className="text-slate-500 capitalize p-1 bg-slate-200 animate-pulse py-2 rounded-full"></p>
                  <div className="flex gap-3">
                    <p className="text-md text-red-600 font-semiboldbold p-1 bg-slate-200 w-full animate-pulse py-2 rounded-full"></p>
                    <p className="text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse py-2 rounded-full"></p>
                  </div>
                  <button className="text-sm w-full text-white rounded-full p-1 bg-slate-200 py-2 animate-pulse"></button>
                </div>
              </div>
            ))
          : data.map((product, index) => (
              <Link
                to={`/product/${product._id}`}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow relative"
                key={index}
              >
                <div className="bg-slate-200 flex justify-center items-center p-4 h-48 min-w-[120px] md:min-w-[150px] relative">
                  <button
                    className={`absolute top-2 right-2 text-2xl ${
                      isProductInWishlist(product?._id)
                        ? "text-red-500"
                        : "text-slate-800"
                    }`}
                    onClick={(e) => handleWishlistToggle(e, product?._id)}
                  >
                    {isProductInWishlist(product?._id) ? (
                      <FaHeart />
                    ) : (
                      <FaRegHeart />
                    )}
                  </button>
                  <img
                    src={product.productImage[0]}
                    className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                    alt={product.productName}
                  />
                </div>
                <div className="p-4 gap-2 flex flex-col justify-between">
                  <h2 className="text-lg font-semibold text-ellipsis line-clamp-1 text-black">
                    {product?.productName}
                  </h2>
                  <p className="text-slate-500 capitalize">
                    {product?.category}
                  </p>
                  <div className="flex gap-3">
                    <p className="text-md text-red-600 font-semiboldbold">
                      {displayINR(product?.sellingPrice)}
                    </p>
                    <p className="text-slate-500 line-through">
                      {displayINR(product?.price)}
                    </p>
                  </div>
                  <button
                    className="text-sm bg-red-600 hover:bg-red-800 text-white rounded-full p-1"
                    onClick={(e) => addToCart(e, product?._id)}
                  >
                    Add to cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default VerticalProductCard;

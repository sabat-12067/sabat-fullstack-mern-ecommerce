import React from "react";
import displayINRCurrency from "../helpers/displayCurrency";
import useAddToCart from "../helpers/AddToCart";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const SearchProductCard = ({ loading, data = [] }) => {
  const loadingList = new Array(13).fill(null);
  const addToCart = useAddToCart();

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 mt-2">
      {loading
        ? loadingList.map((_, index) => (
            <div key={index} className="w-full bg-white rounded-sm shadow ">
              <div className="bg-slate-200 flex justify-center items-center p-4 h-48 animate-pulse"></div>
              <div className="p-4 gap-2 flex flex-col justify-between w-full ">
                <h2 className="text-lg font-semibold text-ellipsis line-clamp-1 text-black p-1 py-2 bg-slate-200 animate-pulse rounded-full"></h2>
                <p className="text-slate-500 capitalize p-1 bg-slate-200 animate-pulse py-2 rounded-full"></p>
                <div className="flex gap-3">
                  <p className="text-md text-red-600 font-semibold p-1 bg-slate-200 w-full animate-pulse py-2 rounded-full"></p>
                  <p className="text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse py-2 rounded-full"></p>
                </div>
                <button className="text-sm w-full text-white rounded-full p-1 bg-slate-200 py-2 animate-pulse"></button>
              </div>
            </div>
          ))
        : data.map((product, index) => (
            <Link
              key={index}
              to={`/product/${product._id}`}
              className="w-full bg-white rounded-sm shadow "
            >
              <div className="bg-slate-200 flex justify-center items-center p-4 h-48">
                <img
                  src={product.productImage[0]}
                  alt={product.productName}
                  className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                />
              </div>
              <div className="p-4 gap-2 flex flex-col justify-between">
                <h2 className="text-lg font-semibold text-ellipsis line-clamp-1 text-black">
                  {product?.productName}
                </h2>
                <p className="text-slate-500 capitalize">{product?.category}</p>
                <div className="flex gap-3">
                  <p className="text-md text-red-600 font-semibold">
                    {displayINRCurrency(product?.sellingPrice)}
                  </p>
                  <p className="text-slate-500 line-through">
                    {displayINRCurrency(product?.price)}
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
  );
};

export default SearchProductCard;

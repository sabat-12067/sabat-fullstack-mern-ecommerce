import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common/API";
import { useSelector } from "react-redux";
import wishlistImg from "../assest/Images/wishlist.png";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import Context from "../context/Context";
import displayINRCurrency from "../helpers/displayCurrency";

const UserWishList = () => {
  const user = useSelector((state) => state?.user?.user);
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const { fetchAddToWishListCount } = useContext(Context);
  const wishlistLoadingList = new Array(context.etchAddToWishListCount).fill(
    null
  );

  const fetchWishlistData = async () => {
    // setLoading(true);
    const apiResponse = await fetch(`${SummaryApi.getWishList.url}`, {
      method: SummaryApi.getWishList.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    // setLoading(false);

    const apiResponseData = await apiResponse.json();
    // console.log(apiResponseData.data)
    if (apiResponseData.success) {
      setWishlistData(apiResponseData.data);
    }
  };

  const handleLoading = async () => {
    await fetchWishlistData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, [user?._id]);

  // console.log("WishList", wishlistData);

  const deleteWishlistProduct = async (e,wishlistId) => {
    e.stopPropagation();
    e.preventDefault();
    const apiResponse = await fetch(`${SummaryApi.deletewishlistProduct.url}`, {
      method: SummaryApi.deletewishlistProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        wishlistId: wishlistId,
      }),
    });

    const apiResponseData = await apiResponse.json();
    if (apiResponseData.success) {
      fetchWishlistData();
      fetchAddToWishListCount();
      // setWishlistData((prevData) => prevData.filter((item) => item.productId._id !== productId));
      // context.setWishListProductCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <div className="container ms-auto p-4 ">
      <p className="w-fit p-2 bg-white rounded text-slate-600 font-semibold text-lg">
        Total Wishlist Product : {wishlistData.length}
      </p>
      {wishlistData.length === 0 && !loading && (
        <div className="flex items-center flex-col">
          <img src={wishlistImg} className="mix-blend-multiply mt-2 rounded " />
          <p className="lg:-mt-8 text-slate-500 font-semibold text-center">
            Looks like you have not added anything to your wishlist. Go ahead
            and explore top products.
          </p>
          <Link to={"/"} className="mt-5">
            <button className="bg-blue-600 rounded text-white font-semibold w-64 mx-auto h-8">
              Continue Shopping
            </button>
          </Link>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8 lg:justify-between lg:px-8">
        {/** WishList View When cart has data */}
        <div className="w-full max-w-3xl p-4 overflow-y-auto">
          {loading
            ? wishlistLoadingList.map((el) => (
                <div
                  className="w-full bg-slate-200 h-32 p-1 my-2 rounded border border-slate-300 animate-pulse"
                  key={el}
                ></div>
              ))
            : wishlistData.map((product) => (
                <Link
                  to={"/product/" + product?.productId?._id}
                  className="w-full bg-slate-100 h-32 my-2 rounded border border-slate-300 grid grid-cols-[128px_1fr] "
                  key={product?._id + "Cart Product"}
                >
                  <div className="w-32 h-32 bg-slate-200 rounded">
                    <img
                      src={product?.productId?.productImage[0]}
                      className="w-full h-full object-scale-down mix-blend-multiply"
                    />
                  </div>
                  <div className="px-4 py-2 relative">
                    {/**Delete button to delete the product from cart */}
                    <div
                      className="absolute right-0 bottom-1 p-2 rounded-full text-red-600 hover:bg-red-600 hover:text-white cursor-pointer"
                      onClick={(e) => deleteWishlistProduct(e, product?._id)}
                    >
                      <MdDelete className="text-2xl" />
                    </div>
                    <h2 className="font-medium lg:text-lg text-ellipsis line-clamp-1">
                      {product?.productId?.productName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product?.productId?.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-red-400 text-lg">
                        {displayINRCurrency(product?.productId?.sellingPrice)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default UserWishList;

import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common/API";
import {FaStar,FaRegStar,FaStarHalfAlt,FaShoppingCart,FaBolt,FaHeart,FaRegHeart,} from "react-icons/fa";
import displayINRCurrency from "../helpers/displayCurrency";
import VerticalProductCard from "../components/VerticalProductCard";
import useAddToCart from "../helpers/AddToCart";
import AddToWishList from "../helpers/AddToWishlist";
import { useSelector } from "react-redux";
import context from "../context/Context";

const ProductDetail = () => {
  const user = useSelector((state) => state?.user?.user);
  const [productData, setProductData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    productDesc: "",
    price: "",
    sellingPrice: "",
  });
  const [loading, setLoading] = useState(false);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImg, setActiveImg] = useState();
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const addToCart = useAddToCart();
  const { fetchAddToWishListCount } = useContext(context);

  const productId = useParams();

  const fetchProductDetails = async () => {
    setLoading(true);
    const data = await fetch(
      `${SummaryApi.singleProductDetail.url}/${productId?.id}`,
      {
        method: SummaryApi.singleProductDetail.method,
      }
    );
    setLoading(false);
    const response = await data.json();
    setProductData(response?.product);
    setActiveImg(response?.product?.productImage[0]);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

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

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  const handleImage = (imageUrl) => {
    setActiveImg(imageUrl);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handleAddToWishList = async (e, id) => {
    e.preventDefault();
    await AddToWishList(e, id);
    fetchAddToWishListCount();
    fetchWishlist(); // Re-fetch the wishlist after adding a product
  };

  const isProductInWishlist = (productId) => {
    return wishlist.some((item) => item?.productId?._id === productId);
  };

  return (
    <div className="container mx-auto p-4 mt-6">
      <div className="container mx-auto p-4">
        <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
          {/** Product Image */}
          <div className="h-96 flex gap-4 flex-col lg:flex-row-reverse rounded">
            <div className="h-[300px] w-[300px] lg:w-96 lg:h-96 bg-slate-200 relative">
              <img
                src={activeImg}
                className="w-full h-full mix-blend-multiply object-scale-down rounded"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setShowZoom(true)}
                onMouseLeave={() => setShowZoom(false)}
              />

              {/** Product Image Zoom Effect */}
              {showZoom && (
                <div
                  className="hidden lg:block absolute min-h-[500px] min-w-[500px] bg-slate-200 p-1 top-0 -right-[510px] overflow-hidden border border-gray-300 rounded"
                  style={{
                    backgroundImage: `url(${activeImg})`,
                    backgroundSize: "200%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }}
                ></div>
              )}
            </div>
            <div className="h-full">
              {loading ? (
                <div className="flex justify-between gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                  {productImageListLoading.map((el, index) => (
                    <div
                      className="h-20 w-20 rounded bg-slate-200 animate-pulse"
                      key={index}
                    ></div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-between gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                  {productData.productImage.map((imageUrl, index) => (
                    <div
                      className="h-20 w-20 rounded bg-slate-200 p-2"
                      key={index}
                    >
                      <img
                        src={imageUrl}
                        className="h-full w-full object-scale-down mix-blend-multiply cursor-pointer p-2"
                        onMouseEnter={() => handleImage(imageUrl)}
                        onClick={() => handleImage(imageUrl)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/** Product Details */}
          {loading ? (
            <div className="flex flex-col gap-2 mt-2">
              <p className="bg-slate-200 animate-pulse px-5 py-3  rounded-full w-full inline-block" />
              <h1 className="text-2xl lg:text-4xl font-semibold bg-slate-200 animate-pulse px-5 py-3 rounded-full w-full" />
              <p className="text-slate-400 capitalize bg-slate-200 animate-pulse px-5 py-3 rounded-full w-full" />
              <div className="text-yellow-500 gap-1 flex items-center bg-slate-200 animate-pulse rounded-full px-5 py-3 w-full"></div>
              <div className="flex gap-4 flex-col font-semibold lg:text-3xl text-2xl my-1 ">
                <p className="bg-slate-200 rounded-full animate-pulse px-5 py-3 w-full"></p>
                <p className="line-through text-slate-400 text-sm lg:font-medium lg:text-lg bg-slate-200 animate-pulse rounded-full px-5 py-3 w-full"></p>
              </div>
              <div className="flex items-center gap-3 my-2 text-xl font-bold">
                <button className=" bg-slate-200  text-white animate-pulse rounded-full px-5 py-3  min-w-[150px] flex items-center justify-center"></button>
                <button className="bg-slate-200  text-white animate-pulse rounded-full px-5 py-3 min-w-[150px] flex items-center justify-center"></button>
              </div>
              <div className="flex flex-col text-center ">
                <p className="text-xl lg:text-2xl text-slate-600 w-full font-semibold text-decoration-line: underline animate-pulse bg-slate-200 rounded-full px-5 py-3 "></p>
                <p className="w-full text-wrap bg-slate-200  text-white rounded-full animate-pulse px-5 py-3 mt-3 "></p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center">
                <p className="bg-red-200 text-red-600 px-2 rounded-full w-fit inline-block">
                  {productData.brandName}
                </p>
                <button
                  className={`ml-2 text-2xl ${
                    isProductInWishlist(productData?._id)
                      ? "text-red-500"
                      : "text-slate-800"
                  }`}
                  onClick={(e) => handleAddToWishList(e, productData?._id)}
                >
                  {isProductInWishlist(productData?._id) ? (
                    <FaHeart />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>
              </div>
              <h1 className="text-2xl lg:text-4xl font-semibold">
                {productData.productName}
              </h1>
              <p className="text-slate-400 capitalize">
                {productData.category}
              </p>
              <div className="text-yellow-500 gap-1 flex items-center">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
                <FaRegStar />
              </div>
              <div className="flex gap-4 items-center font-semibold lg:text-3xl text-2xl my-1">
                <p>{displayINRCurrency(productData.sellingPrice)}</p>
                <p className="line-through text-slate-400 rounded w-fit text-sm lg:font-medium lg:text-lg">
                  {displayINRCurrency(productData.price)}
                </p>

                {/** Calculate and display discount percentage */}
                {productData.sellingPrice && productData.price && (
                  <p className="text-green-500 text-sm">
                    {Math.round(
                      ((productData.price - productData.sellingPrice) /
                        productData.price) *
                        100
                    )}
                    % off
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3 my-2 text-xl font-bold">
                <button className="border-2 border-amber-600 bg-amber-600 hover:bg-amber-700 text-white rounded px-3 py-1 min-w-[150px] flex items-center justify-center">
                  <FaBolt className="mr-2" /> Buy Now
                </button>
                <button
                  className="border-2 border-orange-600 bg-orange-600 hover:bg-orange-700 text-white rounded px-3 py-1 min-w-[150px] flex items-center justify-center"
                  onClick={(e) => addToCart(e, productData?._id)}
                >
                  <FaShoppingCart className="mr-2" /> Add To Cart
                </button>
              </div>
              <div className="flex flex-col text-center">
                <p className="text-xl lg:text-2xl text-slate-600 font-semibold text-decoration-line: underline">
                  Product Description
                </p>
                <p className="w-full text-wrap">{productData.productDesc}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/** Related Products */}
      {productData?.category && (
        <VerticalProductCard
          category={productData?.category}
          heading={"Related Products"}
        />
      )}
    </div>
  );
};

export default ProductDetail;

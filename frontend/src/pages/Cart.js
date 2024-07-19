import React, { useEffect, useState } from "react";
import SummaryApi from "../common/API";
import { useSelector } from "react-redux";
import cartImg from "../assest/Images/Cart.webp";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

import {loadStripe} from '@stripe/stripe-js';

const Cart = () => {
  const user = useSelector((state) => state?.user?.user);
  const { cartCount, countCartProducts } = useCart();
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Generating array of null values based on cartCount
  const cartLoadingList = Array.from(
    { length: cartCount },
    (_, index) => index
  );

  const fetchCartData = async () => {
    // setLoading(true);
    const apiResponse = await fetch(
      `${SummaryApi.countCart.url}/${user?._id}`,
      {
        method: SummaryApi.countCart.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      }
    );

    // setLoading(false);

    const apiResponseData = await apiResponse.json();
    // console.log(apiResponseData.data)
    if (apiResponseData.success) {
      setCartData(apiResponseData.data);
    }
  };

  const handleLoading = async () => {
    await fetchCartData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, [user?._id]);

  const updateQuantity = async (productId, qty, increase = true) => {
    const newQty = increase ? qty + 1 : qty - 1;

    // console.log("product Id: ",productId)

    if (newQty < 1) return;

    const apiResponse = await fetch(SummaryApi.updateProductQuantity.url, {
      method: SummaryApi.updateProductQuantity.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId,
        quantity: newQty,
      }),
    });

    const apiData = await apiResponse.json();

    if (apiData.success) {
      fetchCartData();
    }
  };

  //Delete Cart Product Function
  const deletedProduct = async (id) => {
    console.log(id);
    const apiResponse = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        cartProductId: id,
      }),
    });

    const apiData = await apiResponse.json();

    if (apiData.success) {
      toast.success(apiData.message);
      console.log(apiData.data);
      fetchCartData();
      setCartData((prevCartData) =>
        prevCartData.filter((product) => product._id !== id)
      );
      countCartProducts();
    }
  };

  //Total Quantity
  const totalQty = cartData.reduce(
    (previousQty, currentQty) => previousQty + currentQty.quantity,
    0
  );

  const totalPrice = cartData.reduce(
    (previousValue, currentValue) =>
      previousValue +
      currentValue?.quantity * currentValue?.productId?.sellingPrice,
    0
  );

  const handlePayment = async () => {
    console.log(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
    const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    const response = await fetch(SummaryApi.checkout.url, {
      method: SummaryApi.checkout.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        cartItems: cartData,
      }),
    });

    const apiData = await response.json();
    if(apiData?.id){
      // alert("Jii")
      stripePromise.redirectToCheckout({sessionId : apiData?.id})
    }
    console.log("Payment Response", apiData);
  };

  return (
    <div className="container ms-auto p-4">
      <p className="w-fit px-4 py-2 bg-white rounded text-slate-700 font-bold text-lg">
        My Cart
      </p>
      {cartData.length === 0 && !loading && (
        <div className="flex items-center flex-col ">
          <img src={cartImg} className="mix-blend-multiply mt-2 rounded " />
          <p className="lg:-mt-8 text-slate-500 font-semibold text-center">
            Looks like you have not added anything to your cart. Go ahead and
            explore top products.
          </p>
          <Link to={"/"} className="mt-5">
            <button className="bg-blue-600 rounded text-white font-semibold w-64 mx-auto h-8">
              Continue Shopping
            </button>
          </Link>
        </div>
      )}
      <div className="flex flex-col lg:flex-row gap-8 lg:justify-between lg:px-8">
        {/** Cart View When cart has data */}
        <div className="w-full max-w-3xl p-4">
          {loading
            ? cartLoadingList.map((el) => (
                <div
                  className="w-full bg-slate-200 h-32 p-1 my-2 rounded border border-slate-300 animate-pulse"
                  key={el}
                ></div>
              ))
            : cartData.map((product) => (
                <div
                  className="w-full bg-slate-100 h-32 my-2 rounded border border-slate-300 grid grid-cols-[128px_1fr]"
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
                      onClick={() => deletedProduct(product?._id)}
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
                      <p className="font-medium text-slate-600 text-lg">
                        {displayINRCurrency(
                          product?.quantity * product?.productId?.sellingPrice
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        className="text-slate-600 rounded-full hover:text-slate-800 border border-red-600 hover:border-red-800 text-lg"
                        onClick={() =>
                          updateQuantity(product?._id, product?.quantity, false)
                        }
                      >
                        <FaMinusCircle />
                      </button>
                      <span>{product?.quantity}</span>
                      <button
                        className="text-slate-600 rounded-full hover:text-slate-800 border border-red-600 hover:border-red-800 text-lg"
                        onClick={() =>
                          updateQuantity(product?._id, product.quantity, true)
                        }
                      >
                        <FaPlusCircle />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/** Cart View Summary When cart has data */}
        <div className="mt-5 lg:mt-2 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-slate-200 rounded animate-pulse border border-slate-300"></div>
          ) : (
            cartCount !== 0 && (
              <div className="h-40 bg-slate-200 rounded border border-slate-300">
                <h2 className="text-white bg-slate-600 text-center font-semibold text-4xl p-3 rounded-t">
                  Cart Summary
                </h2>
                <div className="flex items-center justify-between gap-2 px-4 font-semibold text-lg text-slate-600">
                  <p className="">Quantity : </p>
                  <p className="">{totalQty}</p>
                </div>
                <div className="flex items-center justify-between gap-2 px-4 font-semibold text-lg text-slate-600">
                  <p>Total Amount :</p>
                  <p>{displayINRCurrency(totalPrice)}</p>
                </div>
                <button
                  className="bg-blue-600 p-2 w-full text-white bottom-0 text-2xl mt-2 rounded-b "
                  onClick={handlePayment}
                >
                  Checkout
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

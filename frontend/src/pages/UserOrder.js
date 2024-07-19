import React, { useEffect, useState } from "react";
import SummaryApi from "../common/API";
import emptyBox from "../assest/empty_order.gif";
import { Link } from "react-router-dom";
import moment from "moment";
import displayINRCurrency from "../helpers/displayCurrency";

const UserOrder = () => {
  const [orderData, setOrderData] = useState([]);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.getOrderData.url, {
      method: SummaryApi.getOrderData.method,
      credentials: "include",
    });

    const data = await response.json();
    if (data.success) {
      setOrderData(data.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-slate-800 underline">My Order</h1>
      {/* For User having order 0 or not ordered yet */}
      {orderData.length === 0 && (
        <div className="flex justify-center items-center gap-3 flex-col lg:mt-16 md:mt-24">
          <img
            src={emptyBox}
            width={300}
            height={300}
            className="rounded mix-blend-multiply"
          />
          <p className="lg:-mt-8 text-slate-500 font-semibold text-center">
            Looks like you have not ordered yet. Go ahead and explore top
            products.
          </p>
          <Link to={"/"} className="mt-5">
            <button className="bg-blue-600 rounded text-white font-semibold w-64 mx-auto h-8">
              Continue Shopping
            </button>
          </Link>
        </div>
      )}

      {/* For user having some ordered data or has ordered something that product */}
      {orderData.map((order, index) => {
        return (
          <div key={order.useId + index} className=" my-4 p-4">
            <p className="font-semibold text-lg text-slate-600 mb-2">
              {moment(order.createdAt).format("LL")}
            </p>
            <div className="border border-slate-600 rounded">
              <div className="grid gap-1 ">
                {order.productDetails.map((product, index) => {
                  return (
                    <Link
                      to={`/product/${product?.productId}`}
                      key={product?.productId + index}
                      className="flex gap-3 bg-slate-100 m-1 rounded"
                    >
                      <div className="w-28 h-28 bg-white rounded-tl-lg rounded-bl-lg overflow-hidden">
                        <img
                          src={product.image[0]}
                          className="w-full h-full object-contain p-1 mix-blend-multiply"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-lg text-ellipsis line-clamp-1 text-slate-800">
                          {product.name}
                        </div>
                        <div className="flex items-center gap-5 mt-1">
                          <div className="text-lg text-red-500 ">
                            {displayINRCurrency(product.price)}
                          </div>
                          <p className="text-lg text-slate-500">
                            Quantity: {product.quantity}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className="flex flex-col lg:flex-row gap-10 px-10 p-4">
                <div>
                  <div className="text-lg text-slate-800 font-bold">
                    Payment Details:
                  </div>
                  <p className="text-slate-600 font-semibold ml-1">
                    Payment Method:{" "}
                    {order.paymentDetails.payment_method_type[0]}
                  </p>
                  <p className="text-slate-600 font-semibold ml-1">
                    Payment Status: {order.paymentDetails.payment_status}
                  </p>
                </div>
                <div>
                  <div className="text-lg text-slate-800 font-bold">
                    Shipping Details:
                  </div>
                  {order.shipping_options.map((shipping, index) => {
                    return (
                      <div
                        key={shipping.shipping_rate + index}
                        className="text-slate-600 font-semibold ml-1"
                      >
                        Shipping Amount:{" "}
                        {displayINRCurrency(shipping.shipping_amount / 100)}
                      </div>
                    );
                  })}
                </div>
                <div className="text-lg text-slate-800 font-bold">
                  Total Amount: {displayINRCurrency(order.total_amount)}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserOrder;

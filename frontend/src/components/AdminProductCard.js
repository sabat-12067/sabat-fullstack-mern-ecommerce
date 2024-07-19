import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../helpers/displayCurrency";

const AdminProductCard = ({ product, fetchData }) => {
  const [editProduct, seteditProduct] = useState(false);
  return (
    <div className="bg-white p-4 rounded border shadow-md w-64 h-90 flex flex-col justify-between">
      <div>
        <div
          className="w-fit ml-auto p-2 bg-blue-500 rounded-full text-white hover:bg-blue-900 transition-all cursor-pointer"
          onClick={() => seteditProduct(true)}
        >
          <FaEdit />
        </div>
        <div className="w-56 h-44 flex justify-center items-center mx-auto">
          <img
            src={product?.productImage[0]}
            className="object-cover h-44 w-54 rounded"
            alt={product.productName}
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2 text-center mt-2">
          {product.productName}
        </h1>
      </div>
      <div>
        <p className="font-semibold text-center mt-2">
          {displayINRCurrency(product.sellingPrice)}
        </p>
      </div>

      {editProduct && (
        <AdminEditProduct
          product={product}
          onClose={() => seteditProduct(false)}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default AdminProductCard;

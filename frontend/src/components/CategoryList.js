import React, { useEffect, useState } from "react";
import SummaryApi from "../common/API";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loding, setLoding] = useState(false);

  const categoryLoading = new Array(13).fill(null);

  const fetchCategoryProduct = async () => {
    setLoding(true);
    const response = await fetch(SummaryApi.getProductByCategory.url, {
      method: SummaryApi.getProductByCategory.method,
    });

    const responseData = await response.json();
    setLoding(false);
    setCategoryProduct(responseData?.data || []);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container pl-10 pr-10 pt-4 pb-4 mx-auto">
      <div className="flex items-center gap-4  justify-between overflow-scroll scrollbar-none">
        {loding
          ? categoryLoading.map((el, index) => {
              return (
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse" key={"categoryLoading"+index}></div>
              );
            })
          : categoryProduct.map((category, index) => {
              return (
                <Link
                  to={"/category-product?category=" + category?.category}
                  className=" cursor-pointer"
                  key={category?.category+index}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex justify-center items-center">
                    <img
                      src={category?.productImage[0]}
                      alt={category?.category}
                      className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                    />
                  </div>
                  <p className="text-center text-sm md:text-base capitalize">
                    {category?.category}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;

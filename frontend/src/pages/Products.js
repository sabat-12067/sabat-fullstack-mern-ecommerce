import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common/API";
import AdminProductCard from "../components/AdminProductCard";

const Products = () => {
  const [openUploadProduct, setopenUploadProduct] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = async() =>{
    try {
      const response = await fetch(SummaryApi.getProduct.url,{
        method: SummaryApi.getProduct.method
      })

      const data = await response.json();
      setProducts(data?.data || []);

    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  }

  useEffect(()=>{
    
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="bg-white px-4 py-2 rounded flex justify-between">
        <h1 className="font-bold text-xl">All Products</h1>
        <button
          className="border-2 border-red-600 bg-slate-200 text-red-600 hover:bg-red-500 hover:text-white transition-all rounded-full py-1 px-3 font-bold text-xl"
          onClick={() => setopenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/**Upload Product component */}
      {openUploadProduct && (
        <UploadProduct onClose={() => setopenUploadProduct(false)} fetchData ={fetchProducts}/>
      )}

      {/** Display products */}

      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-19px)] overflow-y-scroll custom-scrollbar">
        {
          products.map((product, index) => {
            return (

              <AdminProductCard product = {product} key={index+"all product"} fetchData ={fetchProducts}/>
            )
          })
        }
      </div>
    </div>
  );
};

export default Products;

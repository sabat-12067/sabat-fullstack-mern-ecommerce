import React, { useState } from "react";
import ProductCategory from "../helpers/ProductCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import UploadImage from "../helpers/UploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common/API";
import { toast } from "react-toastify";
import Products from "../pages/Products";

const UploadProduct = ({ onClose, fetchData}) => {
  const [productData, setproductData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    productDesc: "",
    price: "",
    sellingPrice: "",
  });

  // const [uploadProductImg, setuploadProductImg] = useState("");
  const [fullScreenImage, setfullScreenImage] = useState("");
  const [openFullScreenImage, setopenFullScreenImage] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setproductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUploadProductImage = async (e) => {
    const file = e.target.files[0];
    // setuploadProductImg(file.name);
    // console.log("Image name", uploadProductImg);
    // console.log("file", file)

    const uploadImageToCloudinary = await UploadImage(file);

    setproductData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageToCloudinary.url],
      };
    });

    // console.log("upload Image : ", uploadImageToCloudinary);
  };

  const handleDeleteProductImage = async(index) =>{
    console.log("Index :", index)

    const newProductImage = [...productData.productImage]
    newProductImage.splice(index, 1)

    setproductData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage],
      };
    });
  }

  {/** Handle Upload Product Submission */}

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission
    // console.log("Data", productData)
    const apiResponse = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
      headers:{
        "content-type" : "application/json"
      },
      credentials : 'include',
      body: JSON.stringify(productData)
    })

    const responseData = await apiResponse.json()

    if (responseData.success) {
      toast.success(responseData.message)
      onClose()
      fetchData()
    }
    if(responseData.error){
      toast.error(responseData.message)
    }
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative p-4 w-full max-w-xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 overflow-hidden">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 ">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Upload Products
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4 text-white max-h-[450px] overflow-auto">
              <form onSubmit={handleSubmit} className="grid gap-4">
                {/**Product Name Field */}
                <label
                  htmlFor="productName"
                  className="block text-lg font-medium text-gray-700 dark:text-gray-400"
                >
                  Product Name :
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  placeholder="Enter Product Name"
                  value={productData.productName}
                  onChange={handleOnChange}
                  className="p-2 bg-slate-300 border rounded text-black"
                />
                {/**Brand Name Field */}
                <label
                  htmlFor="brandName"
                  className="block text-lg font-medium text-gray-700 dark:text-gray-400"
                >
                  Brand Name :
                </label>
                <input
                  type="text"
                  id="brandName"
                  name="brandName"
                  placeholder="Enter Brand Name"
                  value={productData.brandName}
                  onChange={handleOnChange}
                  className="p-2 bg-slate-300 border rounded text-black"
                />
                {/**Category Field */}
                <label
                  htmlFor="category"
                  className="block text-lg font-medium text-gray-700 dark:text-gray-400"
                >
                  Category :
                </label>
                <select
                  id="category"
                  name="category"
                  value={productData.category}
                  onChange={handleOnChange}
                  className="p-2 bg-slate-300 border rounded text-black"
                >
                  <option value="" >Select Category</option>
                  {ProductCategory.map((category, index) => (
                    <option value={category.value} key={category.value + index}>
                      {category.label}
                    </option>
                  ))}
                </select>

                {/**Product Image Field */}
                <label
                  htmlFor="productImage"
                  className="block text-lg font-medium text-gray-700 dark:text-gray-400"
                >
                  Product Image :
                </label>
                <label htmlFor="uploadImageImput">
                  <div className="p-2 bg-slate-100 rounded border w-full h-32 flex justify-center items-center cursor-pointer">
                    {/* Add input or drag-and-drop area for image */}
                    <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                      <FaCloudUploadAlt className="text-4xl" />
                      <p className="text-md">Uplaod Product Image</p>
                      <input
                        type="file"
                        id="uploadImageImput"
                        className="hidden"
                        onChange={handleUploadProductImage}
                      />
                    </div>
                  </div>
                </label>
                <div className="flex flex-row gap-1 ">
                  {productData?.productImage[0] ? (
                    productData.productImage.map((img, index) => {
                      
                      return (
                        <div className="relative group">
                          <div className="absolute text-white right-0 p-1 bg-red-600 rounded-full hidden group-hover:block cursor-pointer" onClick={()=>handleDeleteProductImage(index)}>
                            <MdDelete/>
                          </div>
                          <img
                            src={img}
                            alt={img}
                            width={80}
                            height={80}
                            className="bg-slate-100 border rounded-sm cursor-pointer w-20 h-36"
                            onClick={() => {
                              setfullScreenImage(img);
                              setopenFullScreenImage(true);
                            }}
                          />
                          
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-xs text-red-600 font-bold">
                      *Please Upload Product image
                    </p>
                  )}
                </div>

                {/**Product Price Field */}
                <label
                  htmlFor="price"
                  className="block text-lg font-medium text-gray-700 dark:text-gray-400"
                >
                  Price :
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Enter Price"
                  value={productData.price}
                  onChange={handleOnChange}
                  className="p-2 bg-slate-300 border rounded text-black custom-number-input"
                />

                {/**Product Selling Price Field */}
                <label
                  htmlFor="sellingPrice"
                  className="block text-lg font-medium text-gray-700 dark:text-gray-400"
                >
                  Selling Price :
                </label>
                <input
                  type="number"
                  id="sellingPrice"
                  name="sellingPrice"
                  placeholder="Enter Selling Price"
                  value={productData.sellingPrice}
                  onChange={handleOnChange}
                  className="p-2 bg-slate-300 border rounded text-black custom-number-input"
                />

                {/**Product Description Field */}
                <label
                  htmlFor="desc"
                  className="block text-lg font-medium text-gray-700 dark:text-gray-400"
                >
                  Product Description :
                </label>
                <textarea
                  type="text"
                  id="desc"
                  name="productDesc"
                  placeholder="Enter Product Description"
                  value={productData.productDesc}
                  onChange={handleOnChange}
                  className="p-2 bg-slate-300 border rounded h-28 text-black resize-none"
                />

                <div className="flex justify-center">
                  <button className="px-3 py-2 bg-red-400 hover:bg-red-700 transition-all text-white font-bold border rounded-full">
                    Upload Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/** Display Image Full Screen */}
        {openFullScreenImage && (
          <DisplayImage
            imageUrl={fullScreenImage}
            onClose={() => setopenFullScreenImage(false)}
          />
        )}
      </div>
    </div>
  );
};

export default UploadProduct;

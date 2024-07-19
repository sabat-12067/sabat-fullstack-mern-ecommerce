import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProductCategory from "../helpers/ProductCategory";
import SearchProductCard from "../components/SearchProductCard";
import SummaryApi from "../common/API";

const CategoryProduct = () => {
  const params = useParams();
  // console.log(params)
  // params.categoryName
  const location = useLocation();
  const navigate = useNavigate();

  const URLSearch = new URLSearchParams(location.search);
  const URLCartegoryListArray = URLSearch.getAll("category");
  // console.log(URLCartegoryListArray)

  const urlCategoryListObject = {};
  URLCartegoryListArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  // console.log("URL Category List : ", urlCategoryListObject)

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);

  const [sortByPrice, setSortByPrice] = useState("")
  // console.log(sortByPrice)

  const fetchData = async () => {
    setLoading(true);
    const apiResponse = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        category: filterCategoryList,
      }),
    });
    setLoading(false);
    const apiData = await apiResponse.json();
    setData(apiData?.data || []);
    // console.log(apiData);
  };

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;

    setSelectCategory((prev) => {
      return {
        ...prev,
        [value]: checked,
      };
    });
  };

  // console.log("Selected Category", selectCategory);

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((el) => el);

    setFilterCategoryList(arrayOfCategory);

    //format for url change when change on checkbox
    const urlFormat = arrayOfCategory.map((el, index) => {
      if (arrayOfCategory.length - 1 === index) {
        return `category=${el}`;
      }

      return `category=${el}&&`;
    });
    // console.log("url Format", urlFormat.join(""))
    // category-product?category=mouse
    navigate("/category-product?" + urlFormat.join(""));

    // console.log("Selected Category : ", arrayOfCategory)
  }, [selectCategory]);

  const handleSortByPrice = (e) =>{
    const {value} = e.target
    setSortByPrice(value)
    if(value === "asc"){
      setData(prev => prev.sort((a,b)=>a.sellingPrice - b.sellingPrice))
    }
    if(value === 'desc'){
      setData(prev => prev.sort((a,b)=>b.sellingPrice - a.sellingPrice))
    }
  }

  useEffect(()=>{

  },[sortByPrice])


  return (
    <div className="container mx-auto px-10 my-5">
      {/* Desktop Version */}
      <div className="hidden md:grid grid-cols-[200px_1fr]">
        {/* Left Side Filter & Sort */}
        <div className="bg-white p-2 rounded min-h-[calc(100vh-120px)] overflow-y-scroll custom-scrollbar">
          <div className="">
            {/* sort By */}
            <h3 className="font-semibold text-slate-500 text-base uppercase border-b border-slate-300 pb-1">
              Sort By
            </h3>
            <form className="text-sm flex flex-col gap-1 py-2">
              <h3 className="font-semibold text-slate-500 text-base uppercase mt-1 px-2">
                Price
              </h3>
              <div className="px-2 flex items-center gap-2">
                <input type="radio" name="sortByPrice" value={"asc"} checked={sortByPrice === 'asc'} onChange={handleSortByPrice}/>
                <label>Low to High </label>
              </div>
              <div className="px-2 flex items-center gap-2">
                <input type="radio" name="sortByPrice" value={"desc"} checked={sortByPrice === 'desc'} onChange={handleSortByPrice}/>
                <label>High to Low </label>
              </div>
            </form>
          </div>
          <div>
            {/* Filter By */}
            <h3 className="font-semibold text-slate-500 text-base uppercase border-b border-slate-300 pb-1">
              Filter By
            </h3>
            <form className="text-sm flex flex-col gap-1 py-2">
              <h3 className="font-semibold text-slate-500 text-base uppercase mt-1 px-2">
                Category
              </h3>
              {ProductCategory.map((categoryName, index) => {
                return (
                  <div className="px-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      name={"category"}
                      checked={selectCategory[categoryName.value]}
                      value={categoryName.value}
                      id={categoryName.value}
                      onChange={handleSelectCategory}
                    />
                    <label htmlFor={categoryName.value}>
                      {categoryName.label}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>
        {/* Right Side Product according to sort and filter */}
        <div className="px-4">
          <p className="bg-white text-slate-700 font-semibold text-lg my-2 w-fit rounded">Results : {data.length}</p>
          <div className="max-h-[calc(100vh-120px)] overflow-y-scroll custom-scrollbar">
            {data.length !== 0 && !loading && (
              <SearchProductCard loading={loading} data={data} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;

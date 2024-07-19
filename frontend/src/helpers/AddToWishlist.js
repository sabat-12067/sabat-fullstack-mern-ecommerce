import { toast } from "react-toastify";
import SummaryApi from "../common/API";

const AddToWishList = async(e, id) => {
  e.stopPropagation();
  e.preventDefault();


  const apiResponse = await fetch(SummaryApi.addToWishList.url, {
    method: SummaryApi.addToWishList.method,
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ productId: id }),
  });

  const apiData = await apiResponse.json();

  if (apiData.success) {
    toast.success(apiData.message);
    // fetchWishlist();
  }
  if (apiData.error) {
    toast.error(apiData.message);
    // navigate("/signin");
  }

  return apiData
};

export default AddToWishList;

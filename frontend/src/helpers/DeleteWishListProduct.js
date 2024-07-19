import { toast } from "react-toastify";
import SummaryApi from "../common/API";

const DeleteToWishList = async(e, id) => {
  e.stopPropagation();
  e.preventDefault();


  const apiResponse = await fetch(SummaryApi.deletewishlistProduct.url, {
    method: SummaryApi.deletewishlistProduct.method,
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ wishlistId: id }),
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

export default DeleteToWishList;

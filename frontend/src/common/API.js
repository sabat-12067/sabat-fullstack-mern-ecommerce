

const backendDomain = process.env.REACT_APP_BACKEND_DOMAIN 

const SummaryApi = {
  signUp : {
    url : `${backendDomain}/api/signup`,
    method : "post"
  },
  signIn : {
    url : `${backendDomain}/api/signin`,
    method : "post"
  },

  userDetail : {
    url : `${backendDomain}/api/user-details`,
    method : "get"
  },
  userLogout :{
    url : `${backendDomain}/api/logout`,
    method : "get"
  },
  allUser : {
    url : `${backendDomain}/api/all-users`,
    method : "get"
  },
  allProduct : {
    url : `${backendDomain}/api/all-products`,
    method : "get"
  },
  updateRole : {
    url : `${backendDomain}/api/update-role`,
    method : "put"
  },
  uploadProduct : {
    url : `${backendDomain}/api/upload-product`,
    method : "post"
  },
  getProduct : {
    url : `${backendDomain}/api/get-product`,
    method : "get"
  },
  updateProduct : {
    url : `${backendDomain}/api/update-product`,
    method : "put"
  },
  getProductByCategory : {
    url : `${backendDomain}/api/get-category-product`,
    method : "get"
  },
  categoryWiseProduct : {
    url : `${backendDomain}/api/get-category-wise-product`,
    method : "get"
  },
  singleProductDetail:{
    url : `${backendDomain}/api/get-single-product-details`,
    method : "get"
  },
  addToCart:{
    url:`${backendDomain}/api/add-to-cart`,
    method : "post"
  },
  countCart :{
    url: `${backendDomain}/api/count-cart-product`,
    method: "get"
  },
  updateProductQuantity : {
    url : `${backendDomain}/api/update-cart-quantity`,
    method : "post"
  },
  deleteCartProduct : {
    url : `${backendDomain}/api/delete-cart-product`,
    method : "post"
  },
  searchProduct : {
    url : `${backendDomain}/api/search-product`,
    method : "get"
  },
  filterProduct : {
    url : `${backendDomain}/api/fiter-product`,
    method : "post"
  },
  addToWishList : {
    url : `${backendDomain}/api/add-to-wishlist`,
    method : "post"
  },
  getWishList : {
    url : `${backendDomain}/api/get-wishlist`,
    method : "get"
  },
  getwishListProductCount : {
    url : `${backendDomain}/api/get-wishlist-count`,
    method : "get"
  },
  deletewishlistProduct :{
    url : `${backendDomain}/api/delete-wishlist-product`,
    method : "post"
  },
  updateUser : {
    url :`${backendDomain}/api/update-user`,
    method : "put"
  },
  sendOtp : {
    url : `${backendDomain}/api/send-otp`,
    method : "post"
  },
  verifyOtp : {
    url : `${backendDomain}/api/verify-otp`,
    method : "post"
  },
  resetPassword : {
    url : `${backendDomain}/api/reset-password`,
    method : "post"
  },
  checkout : {
    url : `${backendDomain}/api/checkout`,
    method : "post"
  },
  getOrderData : {
    url : `${backendDomain}/api/get-order-details`,
    method : "get"
  }
}

export default SummaryApi
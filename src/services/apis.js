const BASE_URL = process.env.REACT_APP_BASE_URL

// AUTH ENDPOINTS
export const endpoints = {
    REGISTER_API: BASE_URL + "/user/register",
    LOGIN_API: BASE_URL + "/user/login",
  }

export const productEndpoints = {
  GET_PRODUCT_API: BASE_URL + "/product/getAllProducts",
  GET_PRODUCT_DETAILS_API:BASE_URL+"/product/getProductDetails"
}

export const authEndpoints={
  // SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/user/register",
  LOGIN_API: BASE_URL + "/user/login",
  RESETPASSTOKEN_API: BASE_URL + "/user/resetPassword",
  RESETPASSWORD_API: BASE_URL + "/user/resetPassword"
}
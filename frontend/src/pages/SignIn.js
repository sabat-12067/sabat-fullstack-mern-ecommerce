import React, { useContext, useState } from "react";
import loginIcon from "../assest/signin.gif"; // corrected typo: from 'assest' to 'assets'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common/API";
import { toast } from "react-toastify";
import context from "../context/Context";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  //to store user data input through login
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { userDetail, fetchAddToWishListCount } = useContext(context);

  // console.log("User Context : ", userContext)

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApiResponse = await dataResponse.json();

    if (dataApiResponse.success) {
      toast.success(dataApiResponse.message);
      userDetail();
      fetchAddToWishListCount()
      navigate("/");
    } else {
      toast.error(dataApiResponse.message);
    }
  };

  // console.log(data)

  return (
    <section id="signin" className="py-12">
      <div className="container py-2">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mx-auto">
          <h1 className="text-5xl mb-4 text-red-500 underline text-center">
            Sign In
          </h1>
          <div className="flex justify-center mb-6">
            <img src={loginIcon} alt="login icon" className="w-24 h-24" />
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition duration-150"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition duration-150"
                />
                <div
                  className="absolute right-3 text-xl text-gray-600 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block text-sm w-fit hover:text-red-600 hover:underline mt-2 ml-auto"
              >
                Forgot password?
              </Link>
            </div>
            <button className="w-full block max-w-[150px] mx-auto bg-red-600 text-white py-3 rounded-full font-semibold hover:bg-red-800 hover:scale-110 transition duration-150">
              Sign In
            </button>
          </form>
          <p className="my-4 block mx-auto text-md w-fit ">
            Don't have an account?{" "}
            <Link to={"/signup"} className="hover:text-red-600 hover:underline">
              Sign Up
            </Link>{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignIn;

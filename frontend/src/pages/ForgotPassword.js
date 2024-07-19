import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common/API";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState();

  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    // console.log(email);

    const response = await fetch(SummaryApi.sendOtp.url, {
      method: SummaryApi.sendOtp.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (data.success) {
      toast.success(data?.message);
      navigate("/verify-otp", { state: { email } });
    }
    if (data.error) {
      toast.error(data?.message);
    }
  };

  return (
    <div className="container mx-auto p-4 max-h-[calc(100vh-70px)] flex justify-center items-center">
      {/* Row */}
      <div className="w-full xl:w-2/4 lg:w-6/12 flex p-6 rounded-lg shadow-black shadow-lg">
        {/* Col */}
        <div
          className="w-full h-auto hidden lg:block lg:w-1/2 rounded-l-lg"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/originals/d2/f1/3d/d2f13d48f5ec46049f05bf6af098e7e9.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        {/* Col */}
        <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
          <div className="px-8 mb-4 text-center">
            <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
            <p className="mb-4 text-sm text-gray-700">
              We get it, stuff happens. Just enter your email address below and
              we'll send you a link to reset your password!
            </p>
          </div>
          <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter Email Address..."
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6 text-center">
              <button
                className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleForgotPassword}
              >
                Reset Password
              </button>
            </div>
            <hr className="mb-6 border-t" />
            <div className="text-center">
              <Link
                className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                to="/signup"
              >
                Create an Account!
              </Link>
            </div>
            <div className="text-center">
              <Link
                className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                to="/signIn"
              >
                Already have an account? Login!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

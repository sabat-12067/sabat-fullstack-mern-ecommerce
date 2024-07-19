import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SummaryApi from "../common/API";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPwd: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setPasswordData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // console.log(passwordData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(passwordData);
    if (passwordData.password === passwordData.confirmPwd) {
      const dataResponse = await fetch(SummaryApi.resetPassword.url, {
        method: SummaryApi.resetPassword.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({password : passwordData?.password, email : email}),
      });

      const dataApiResponse = await dataResponse.json();

      if (dataApiResponse.success) {
        toast.success(dataApiResponse.message);
        navigate("/signin");
      }
      if (dataApiResponse.error) {
        toast.error(dataApiResponse.message);
      }
    } else {
      toast.error("Passwords do not match. Please verify and enter again.");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-slate-200">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-white text-black rounded-lg shadow dark:border md:mt-0 sm:max-w-md   sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Change Password
          </h2>
          <form
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                New Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={passwordData.password}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleOnChange}
                />
                <div
                  className="absolute right-3 text-xl text-slate-900 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Confirm password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showConfirmPwd ? "text" : "password"}
                  name="confirmPwd"
                  id="confirm-password"
                  value={passwordData.confirmPwd}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleOnChange}
                />
                <div
                  className="absolute right-3 text-xl text-slate-900 cursor-pointer"
                  onClick={() => setShowConfirmPwd((prev) => !prev)}
                >
                  {showConfirmPwd ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Reset passwod
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;

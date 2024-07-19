import React, { useState } from "react";
import imageToBase64 from "../helpers/imageToBase64";
import loginIcon from "../assest/signin.gif"; // corrected typo: from 'assest' to 'assets'
import { FaEye, FaEyeSlash, FaWindowClose } from "react-icons/fa";
import SummaryApi from "../common/API";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UserEdit = ({ onClose }) => {
  const user = useSelector((state) => state?.user?.user);

  // console.log("User & OnClose", onClose, user)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [userData, setUserData] = useState({
    name: user?.name,
    email: user?.email,
    contact: user?.contact,
    password: "",
    confirmPwd: "",
    profilepic: user?.profilepic,
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    const image = await imageToBase64(file);

    // console.log("Image ", image)

    setUserData((prev) => {
      return {
        ...prev,
        profilepic: image,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(userData);

    if (userData.password === userData.confirmPwd) {
      const dataResponse = await fetch(SummaryApi.updateUser.url, {
        method: SummaryApi.updateUser.method,
        headers: {
          "content-type": "application/json",
        },
        credentials : "include",
        body: JSON.stringify(userData),
      });

      // console.log("User Data", userData);
      const dataApiResponse = await dataResponse.json();
      console.log(dataApiResponse)

      if (dataApiResponse.success) {
        toast.success(dataApiResponse.message);
        onClose("false")
      }
      if (dataApiResponse.error) {
        toast.error(dataApiResponse.message);
      }
    } else {
      toast.error("Please check your password");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative p-4 w-full max-w-xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 overflow-hidden">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 ">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Edit Profile
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
          <section
            id="signin"
            className="p-4 md:p-5 space-y-4 text-white max-h-[450px] overflow-auto "
          >
            <div className="container py-2 mx-auto">
              <div className="shadow-lg rounded-lg p-8 w-full max-w-4xl mx-auto relative bg-slate-600 bg-opacity-50">
                <div className="w-24 h-24 mx-auto relative rounded-full overflow-hidden">
                  <div>
                    <img
                      src={userData.profilepic || loginIcon}
                      alt="login icon"
                    />
                  </div>
                  <form>
                    <label>
                      <div className="text-xs bg-slate-200 bg-opacity-70 pb-4 pt-2 cursor-pointer absolute py-4 bottom-0 w-full text-center ">
                        Upload Image
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleUploadPic}
                      />
                    </label>
                  </form>
                </div>
                <form className="space-y-2" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-400">
                      Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        value={userData?.name}
                        onChange={handleOnChange}
                        className="w-full h-8 p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition duration-150"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-400">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={userData?.email}
                        onChange={handleOnChange}
                        className="w-full h-8 p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition duration-150"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-400">
                      Contact
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your contact "
                        name="contact"
                        value={userData?.contact}
                        onChange={handleOnChange}
                        className="w-full h-8 p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition duration-150"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-400">
                      Password
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        name="password"
                        value={userData?.password}
                        onChange={handleOnChange}
                        className="w-full h-8 p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition duration-150"
                      />
                      <div
                        className="absolute right-3 text-xl text-gray-600 cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-400">
                      Confirm Password
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type={showConfirmPwd ? "text" : "password"}
                        placeholder="Confirm your password"
                        name="confirmPwd"
                        value={userData?.confirmPwd}
                        onChange={handleOnChange}
                        className="w-full h-8 p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition duration-150"
                      />
                      <div
                        className="absolute right-3 text-xl text-gray-600 cursor-pointer"
                        onClick={() => setShowConfirmPwd((prev) => !prev)}
                      >
                        {showConfirmPwd ? <FaEyeSlash /> : <FaEye />}
                      </div>
                    </div>
                  </div>
                  <button className="w-full block max-w-[150px] mx-auto bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-800 hover:scale-110 transition duration-150">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;

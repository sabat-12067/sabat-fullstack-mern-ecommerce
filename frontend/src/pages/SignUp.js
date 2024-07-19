import React from "react";
import loginIcon from "../assest/signin.gif"; // corrected typo: from 'assest' to 'assets'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageToBase64 from "../helpers/imageToBase64"

import { useState } from "react";
import SummaryApi from "../common/API";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  //to store user data input through login
  const [data, setData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPwd: "",
    profilepic: "",
  });

  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadPic = async (e) =>{
    const file = e.target.files[0]

    const image = await imageToBase64(file)

    // console.log("Image ",image)

    setData((prev) => {
      return {
        ...prev,
        profilepic: image
      };
    });


  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(data.password === data.confirmPwd){
      const dataResponse = await fetch(SummaryApi.signUp.url, {
        method : SummaryApi.signUp.method,
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
  
      const dataApiResponse = await dataResponse.json()

      if(dataApiResponse.success){
        toast.success(dataApiResponse.message)
        navigate("/signin")
      }
      if(dataApiResponse.error){
        toast.error(dataApiResponse.message)
      }
    }else{
      toast.error("Passwords do not match. Please verify and enter again.")
    }

    
  };

  // console.log(data);

  return (
    <section id="signin" className="py-8">
      <div className="container py-2">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mx-auto">
          <h1 className="text-5xl mb-4 text-red-500 underline text-center">
            Sign Up
          </h1>
          <div className="w-24 h-24 mx-auto relative rounded-full overflow-hidden">
            <div>
              <img src={data.profilepic || loginIcon} alt="login icon" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-slate-200 bg-opacity-70 pb-4 pt-2 cursor-pointer absolute py-4 bottom-0 w-full text-center ">
                  Upload Profile
                </div>
                <input type="file" className="hidden" onChange={handleUploadPic}/>
              </label>
            </form>
          </div>
          <form className="space-y-2" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  className="w-full h-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition duration-150"
                />
              </div>
            </div>
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
                  className="w-full h-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition duration-150"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Contact
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your contact "
                  name="contact"
                  value={data.contact}
                  onChange={handleOnChange}
                  className="w-full h-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition duration-150"
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
                  className="w-full h-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition duration-150"
                />
                <div
                  className="absolute right-3 text-xl text-gray-600 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash />  :  <FaEye />}
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showConfirmPwd ? "text" : "password"}
                  placeholder="Confirm your password"
                  name="confirmPwd"
                  value={data.confirmPwd}
                  onChange={handleOnChange}
                  className="w-full h-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition duration-150"
                />
                <div
                  className="absolute right-3 text-xl text-gray-600 cursor-pointer"
                  onClick={() => setShowConfirmPwd((prev) => !prev)}
                >
                  {showConfirmPwd ? <FaEyeSlash /> :  <FaEye />}
                </div>
              </div>
            </div>
            <button className="w-full block  max-w-[150px] mx-auto bg-red-600 text-white py-3 rounded-full font-semibold hover:bg-red-800 hover:scale-110 transition duration-150">
              Sign Up
            </button>
          </form>
          <p className="my-2 block mx-auto text-md w-fit ">
            Already have an account?{" "}
            <Link to={"/signin"} className="hover:text-red-600 hover:underline">
              Sign In
            </Link>{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;

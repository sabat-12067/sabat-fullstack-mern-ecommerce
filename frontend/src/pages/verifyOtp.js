import React, { useState, useEffect, useRef } from "react";
import SummaryApi from "../common/API";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const [seconds, setSeconds] = useState(300); // 300 seconds = 5 minutes
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Array to store OTP digits
  const inputRefs = useRef([]); // Ref to store references to input fields

  // Create refs for each OTP input field
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, otp.length);
  }, [otp.length]);

  // Handle input change in OTP fields
  const handleInputChange = (index, value) => {
    // Allow any input character or digit
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input field if available
    if (index < otp.length - 1 && value !== "") {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle Backspace key to move to previous input field
  const handleBackspace = (index, e) => {
    if (e.key === "Backspace") {
      // Clear the current input and move to previous field
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  // Timer effect for OTP expiration
  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      // Handle expiration action here, e.g., redirect or notify user
      toast.error("OTP expired");
    }
  }, [seconds]);

  // Function to handle OTP verification
  const handleVerifyOtp = async(e) => {
    e.preventDefault();
    const otpString = otp.join(""); // Join array into a single string
    // console.log("OTP", otpString);
    const response = await fetch(SummaryApi.verifyOtp.url,{
      method : SummaryApi.verifyOtp.method,
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify({otp : otpString, email: email})
    })
    
    const data = await response.json()

    if(data.success){
      toast.success(data?.message)
      navigate("/reset-password", { state: { email } })
    }
    if(data.error){
      toast.error(data?.message)
    }
  };

  // Function to request OTP again
  const handleRequestOtp = async (e) => {
    e.preventDefault();
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
      setSeconds(300); // Reset timer on successful OTP request
    }
    if (data.error) {
      toast.error(data?.message);
    }
  };

  // Function to format time for display
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6 underline">
            Verify OTP
          </h2>
          <p className="text-center text-gray-600 font-semibold font-xl mb-6">
            Your code was sent to you via email
          </p>
          <p className="text-center text-gray-600 font-semibold font-xl mb-6">
            OTP expires in {formatTime(seconds)} {/* Display timer */}
          </p>
          <div className="flex justify-center items-center space-x-2 mb-2">
            {otp.map((string, index) => (
              <input
                key={index}
                type="text"
                className="otp-input border border-slate-500 rounded w-10 h-10 text-center"
                value={string}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleBackspace(index, e)}
              />
            ))}
          </div>
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleVerifyOtp}
          >
            Verify
          </button>
          <p className="text-center text-gray-500 text-sm mt-4">
            Didn't receive code?{" "}
            <p className="text-blue-500 cursor-pointer" onClick={handleRequestOtp}>
              Request again
            </p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;

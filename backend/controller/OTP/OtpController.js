const otpGenerator = require('otp-generator');
const OTP = require('../../model/OTPModel');
const userModel = require('../../model/userModel');

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    // console.log(email)
    // Check if user is present
    const checkUserPresent = await userModel.findOne({ email });
    // If user found with provided email
    // console.log("User",checkUserPresent)
    if (!checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: true,
      lowerCaseAlphabets: true,
      specialChars: true,
    });
    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: true,
      });
      result = await OTP.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    res.status(200).json({
      error: false,
      success: true,
      message: 'OTP sent successfully',
      otp,
    });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ 
      error : true,
      success: false, 
      error: error.message });
  }
};

module.exports = sendOTP
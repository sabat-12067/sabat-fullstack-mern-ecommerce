const userModel = require("../../model/userModel");
const bcrypt = require('bcrypt');

const Updateuser = async (req, res) => {

  // console.log(req?.body)

  try {
    const userId = req?.userId;
  
    const { email, password, name, contact} = req.body;
    // console.log(req?.body);

    // console.log("req.body", req.body)

    if (!email) {
      throw new Error("Please provide email..");
    }

    if (!password) {
      throw new Error("Please provide password..");
    }

    if (!name) {
      throw new Error("Please provide name..");
    }

    if (!contact) {
      throw new Error("Please provide contact..");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something went wrong");
    }

    const payload = {
      ...req.body,
      password : hashPassword
    } 
    console.log(payload)

    const options = { new: true };
    // console.log("User ID",userId)
    const result = await userModel.findByIdAndUpdate(
      {_id : userId},
      payload,
      options
    );
    // res.send("result", result );

    res.status(200).json({
      data: result,
      message: "Profile updated successfully..!",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = Updateuser;

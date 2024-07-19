const bcrypt = require('bcrypt')
const userModel = require('../../model/userModel')
const jwt = require('jsonwebtoken')

const userSignInController = async (req, res) =>{

  try {

    const {email, password} = req.body

    if(!email){
      throw new Error("Please enter email..!")
    }

    if(!password){
      throw new Error("Please enter password..!")
    }


    const user = await userModel.findOne({email})

    if(!user){
      throw new Error("No user exist with this email..!")
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    // console.log("Check Password", checkPassword)

    if(checkPassword){

      const tokenData = {
        _id : user._id,
        email : user.email,
      }

      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 12 })
      const tokenOption = {
        httpOnly : true,
        secure : true,
        sameSite : 'None'
      }

      res.cookie("token", token, tokenOption).status(200).json({
        message : "Sign in successfull..!",
        data : token,
        success : true,
        error : false,
      })

    }else{
      throw new Error("Please enter correct password..!")
    }

    
  } catch (error) {
    res.json({
      message : error.message || error,
      error : true,
      success : false,
    })
  }
}

module.exports = userSignInController
const userModel = require('../../model/userModel')

const bcrypt = require('bcrypt');


const userSignUpController = async (req, res) => {
  try {
    const {email, password, name} = req.body

    const user = await userModel.findOne({email})

    console.log(req?.body)

    if(user){
      throw new Error("Email already exist..!")
    }

    // console.log("req.body", req.body)

    if(!email){
      throw new Error("Please provide email..")
    }

    if(!password){
      throw new Error("Please provide password..")
    }

    if(!name){
      throw new Error("Please provide name..")
    }

    const salt = bcrypt.genSaltSync(10)
    const hashPassword = await bcrypt.hashSync(password, salt)

    if(!hashPassword){
      throw new Error("Something went wrong")
    }

    const payload = {
      ...req.body,
      role : "USER",
      password : hashPassword
    } 

    const userData = new userModel(payload)

    const saveUser = await userData.save()

    res.status(201).json({
      data : saveUser,
      success : true,
      error : false,
      message : "User Registered Successfully..!"
    })

  } catch (error) {

    // console.log(error)
    res.status(400).json({
      message : error.message || error,
      error : true,
      success : false,
    })
  }
}

module.exports = userSignUpController
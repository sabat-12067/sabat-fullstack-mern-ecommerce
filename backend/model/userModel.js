const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name : {
    required : true,
    type : String,
  },
  email : {
    required : true,
    type : String,
    unique : true,
  },
  contact : {
    required: true,
    type : String,
  },
  password : {
    required : true,
    type : String,
  },
  profilepic :{
    // required : true,
    type : String,
  },
  role : {
    type : String
  }
},{
  timestamps : true
}

)

const userModel = mongoose.model('user', userSchema)

module.exports = userModel
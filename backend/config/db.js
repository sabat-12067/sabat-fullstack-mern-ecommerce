const mongoose = require('mongoose')

const connectMongoDB = async () =>{
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Database connected..!')
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectMongoDB
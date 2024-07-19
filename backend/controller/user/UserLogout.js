const UserLogout = async (req, res) =>{
  try {

    res.clearCookie("token")

    res.json({
      data : [],
      message : "Logged out successfully..!",
      error : false,
      success : true
    })
    
  } catch (error) {
    res.json({
      message : error.message || error,
      error : true,
      success : false,
    })
  }
}

module.exports = UserLogout
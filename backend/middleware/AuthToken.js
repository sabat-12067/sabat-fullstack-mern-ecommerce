
const jwt = require('jsonwebtoken');

const authToken = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers['authorization'];
    // console.log('Token:', token);
    if (!token) {
      return res.status(401).json({
        message: "Please log in to proceed.",
        error: true,
        success: false
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (error, decoded) => {
      if (error) {
        return res.status(403).json({
          message: "Please log in to proceed.",
          error: true,
          success: false
        });
      }

      req.userId = decoded?._id;
      next();
    });

  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false
    });
  }
};

module.exports = authToken;

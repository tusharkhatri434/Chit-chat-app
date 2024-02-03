const { userService } = require("../services/index");

const UserService = new userService();

const tokenVerify = async (req, res,next) => {
  try {
    const data = await UserService.verifyToken(req.headers["x-jwt-token"]);
    if(data){
      next();
    }else{
      throw new error;
    }
  } catch (error) {
    res.status(500).json({
      res: "token has been expired",
    });
  }
};

module.exports = tokenVerify;

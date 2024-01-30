const {userService} = require('../services/index');

const UserService = new userService();

const create = async (req,res)=>{
   try {
     const data = await UserService.create(req.body);
     res.status(200).json({
       res: data,
       err: "",
     });
   } catch (error) {
     res.status(500).json({
        res:"",
        error:err
     })
   }
} 

const find = async (req,res)=>{
    try {
        const data = await UserService.findUser(req.body);
        res.status(201).json({
          res:data
        })
    } catch (error) {
        res.status(500).json({
          res:"",
          err:error
        })
    }
}

const tokenVerify = async (req,res)=>{
   try {
     console.log(req.headers['x-jwt-token']);
    const data = await UserService.verifyToken(req.headers['x-jwt-token']);
    res.status(200).json({
      res:"ok",
      name:data.name,
      email:data.email,
      user_id:data._id

    })
   } catch (error) {
      res.status(500).json({
        res:"token has been expired"
      })
   }
}

module.exports = {
  createUser: create,
  loginUser: find,
  getUserDetails:tokenVerify,
};
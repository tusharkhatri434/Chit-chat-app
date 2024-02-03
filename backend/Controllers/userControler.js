const { userService } = require("../services/index");

const UserService = new userService();

const create = async (req, res) => {
  try {
    const data = await UserService.create(req.body);
    res.status(200).json({
      res: data,
      err: "",
    });
  } catch (error) {
    res.status(500).json({
      res: "",
      error: err,
    });
  }
};

const find = async (req, res) => {
  try {
    const data = await UserService.findUser(req.body);
    res.status(201).json({
      res: data,
    });
  } catch (error) {
    res.status(500).json({
      res: "",
      err: error,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const data = await UserService.getAll(req.query);
    res.status(200).json({
      res: data,
    });
  } catch (error) {
    res.status(500).json({
      res: "",
      err: error,
    });
  }
};

module.exports = {
  createUser: create,
  loginUser: find,
  getAllUser: getAllUsers,
};

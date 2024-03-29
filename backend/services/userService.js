const {userRepository} = require('../repository/index');
const { userNotFound } = require("../errors/loginAndSign");
 const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateTokens');
const getTokenId = require('../utils/getTokenData');
class userService {
  constructor() {
    this.UserRepository = new userRepository();
  }

  async create(data) {
    try {
      const user = await this.UserRepository.create(data);
      const response = {
        user: user._id,
        name: user.name,
        email: user.email,
        pic:user.pic,
        token: generateToken(user._id),
      };
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async findUser(data) {
    try {
      const user = await this.UserRepository.find(data);
      if (!user) {
        return userNotFound;
      }
      const res = await bcrypt.compareSync(data.password, user.password);
      const response = {
        user: user._id,
        name: user.name,
        email: user.email,
        pic:user.pic,
        token: generateToken(user._id),
      };
      return user && res === true ? response : notFound;
    } catch (error) {
      console.log(error);
    }
  }

  async verifyToken(token) {
    try {
      const { id } = getTokenId(token);
      if (id) {
        const res = await this.UserRepository.findById(id);
        return res;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(data) {
    try {
      const res = await this.UserRepository.findAll(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = userService;
const User = require('../models/userModel');

class userRepository{

    async create(data) {
        try {
            const res = await User.create(data);
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    async find(data) {
        try {
            const res = await User.findOne({email:data.email});
            return res;
        } catch (error) {
            throw error;
        }
    }

    async findById(id){
        try {
            const res = await User.findById(id);
            return res;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = userRepository;
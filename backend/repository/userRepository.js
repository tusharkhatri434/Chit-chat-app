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

    async findAll(data){
        try {
            const keywords = data.search
              ? {
                  $or: [
                    { name: { $regex: `${data.search}`, $options: "i" } },
                    { email: { $regex: `${data.search}`, $options: "i" } },
                  ],
                }
              : {};

            const res = await User.find(keywords).find({_id : {$ne:data._id}});
            return res;

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = userRepository;
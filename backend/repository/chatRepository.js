const Chat = require("../models/chatModel");
const User = require("../models/userModel");

class chatRepository {
  async create(data) {
    try {
      const res = await Chat.create(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async createGroupChat(data){
      try {
        const groupChat = await Chat.create(data);
        return groupChat;
      } catch (error) {
        throw error;
      }
  }

  async find(data) {
    try {
      let isChat = await Chat.find(data).populate("users","-password").populate("latestMessage");
      isChat = await User.populate(isChat,{
        path:"latestMessage.sender",
        select:"name pic email",
      });

      return isChat;
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      const res = await Chat.findById(id).populate("users", "-password");
      return res;
    } catch (error) {
      throw error;
    }
  }

  async findAll(id){
    try {
        const chats = await Chat.find({
          users: { $elemMatch: { $eq: id } },
        })
          .populate("users", "-password")
          .populate("groupAdmin", "-password")
          .populate("latestMessage")
          .sort({ updatedAt: -1 });
         
         const res = await User.populate(chats, {
           path: "latestMessage.sender",
           select: "name pic email",
         }); 

         return res;

    } catch (error) {
        
    }
  }

  async findOne(id){
    try {
      const res = await Chat.findOne({_id:id})
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
      
      return res;
    } catch (error) {
      
    }
  }

  async renameGroup({chatId,chatName}){
    try {
      const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
          chatName: chatName,
        },
        {
          new: true,
        }
      )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

        return updatedChat;
    } catch (error) {
      throw error
    }
  }

  async removeMember({chatId,userId}){
    try {
      const res = await Chat.findByIdAndUpdate(
        chatId,
        { 
          $pull: { users:userId },
        },
        { new: true }
      ).populate("users", "-password").populate("groupAdmin", "-password");

      return res;
    } catch (error) {
      throw error;
    }
  }

  async addToGroup({chatId,userId}){
    try {
      const res = await Chat.findByIdAndUpdate(
        chatId,
        {
          $push: { users: userId },
        },
        {
          new: true,
        }
      ).populate("users", "-password").populate("groupAdmin", "-password");

      return res;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = chatRepository;

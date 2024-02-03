const {chatRepository} = require('../repository/index');

class chatService {
  constructor() {
    this.ChatRepository = new chatRepository();
  }

  async getAll(data) {
    try {
      const res = await this.ChatRepository.findAll(data._id);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async getChatOne(data) {
    try {
      // const res = await this.ChatRepository.find(data);
       var isChat = await this.ChatRepository.find({
         isGroupChat: false,
         $and: [
           { users: { $elemMatch: { $eq: data._id } } },
           { users: { $elemMatch: { $eq: data.userId } } },
         ],
       }); 

       if(isChat.length>0){
        return isChat[0];
       }else{
        var chatData = {
          chatName:"sender",
          isGroupChat:false,
          users:[data._id,data.userId],
        };

        const createdChat = await this.ChatRepository.create(chatData);
        const FullChat = await this.ChatRepository.findOne({
          _id: createdChat._id,
        }).populate("users", "-password");
        return FullChat;
       }
    } catch (error) {
      
    }
  }

  async createGroupChat(data){
    try {
      let users = data.users;
      if(users.length<2){
        return {msg:"More  than two user require",}
      }
      users.push(data.user);
      const groupDetails = {
        chatName: data.name,
        users: users,
        isGroupChat: true,
        groupAdmin: data.user,
      }
      const groupChat = await this.ChatRepository.createGroupChat(groupDetails);
      const res = await this.ChatRepository.findOne(groupChat._id);
      return res
    } catch (error) {
      throw error;
    }
  }

  async  renameGroupName(data){
    try {
      const res = await this.ChatRepository.renameGroup(data);
      if(!res){
        return "Group not found";
      }
      else{
        return res
      }
    } catch (error) {
      throw error;
    }
  }

  async removeFromGroup(data){
    try {
      const res = await this.ChatRepository.removeMember(data);
      if(!res){
        return "Not removed";
      }
      else{
        return res;
      }
    } catch (error) {
      throw error;
    }
  }

  async addToGroup(data){
    try {
      const res = await this.ChatRepository.addToGroup(data);
      if(!res){
        return "Not added";
      }
      else{
        return res;
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = chatService;
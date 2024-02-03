const {chatService} = require('../services/index');
const ChatService = new chatService();


const getOneChat = async (req,res)=>{
  try {
    const data = await ChatService.getChatOne(req.body);
      res.status(200).json({
        ress:data,
        success:"ok",
      })
  } catch (error) {
    res.status(200).json({
      res: "",
      success: "Error occured",
      err:error
    });
  }
}

const getAllChat = async (req, res) => {
  try {
    const data = await ChatService.getAll(req.body);
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

const createGroupChat = async (req,res)=>{
  try {
    const data = await ChatService.createGroupChat(req.body);
    res.status(201).json({
      data:data,
      success:"true"
    })
  } catch (error) {
    res.status(500).json({
      success:false
    })
    console.log(error);
  }
}
const changeName = async (req,res)=>{
  try {
    const data = await ChatService.renameGroupName(req.body);
    res.status(201).json({
      data:data,
      success:"true"
    })
  } catch (error) {
    res.status(500).json({
      success:false
    })
    console.log(error);
  }
}
const addToGroup = async (req,res)=>{
  try {
    const data = await ChatService.addToGroup(req.body);
    res.status(201).json({
      data:data,
      success:"true"
    })
  } catch (error) {
    res.status(500).json({
      success:false
    })
    console.log(error);
  }
}
const removeFromGroup = async (req,res)=>{
  try {
    const data = await ChatService.removeFromGroup(req.body);
    res.status(201).json({
      data:data,
      success:"true"
    })
  } catch (error) {
    res.status(500).json({
      success:false
    })
    console.log(error);
  }
}

module.exports = {
  getAllChats: getAllChat,
  getChatOne: getOneChat,
  createGroup: createGroupChat,
  changeGroupName: changeName,
  addTo:addToGroup,
  removeFrom:removeFromGroup
};
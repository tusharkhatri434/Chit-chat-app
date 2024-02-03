const express = require('express');
const routes = express.Router();
const chats = require("../data/data");
const {
  createUser,
  loginUser,
  getAllUser,
} = require("../Controllers/userControler");
const tokenVerify = require('../middlewares/tokenVerify');
const { getChatOne, createGroup, getAllChats, removeFrom, addTo, changeGroupName } = require('../Controllers/chatController');

routes.get("/", (req, res) => {
  res.send("App is running");
});

routes.post("/api/signup",createUser);
routes.post("/api/login", loginUser);
routes.get("/api/token-verify", tokenVerify);
routes.get("/api/getUsers",tokenVerify,getAllUser);

// Chats APIs ---
routes.post("/api/chat", getChatOne);
routes.get("/api/chats", getAllChats);
routes.post("/api/group", createGroup);
routes.put("/api/chat/rename", changeGroupName);
routes.put("/api/chat/add", addTo);
routes.put("/api/chat/remove", removeFrom);

module.exports = routes;
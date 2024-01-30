const express = require('express');
const routes = express.Router();
const chats = require("../data/data");

routes.get("/", (req, res) => {
  res.send("App is running");
});

routes.get("/api/chats", (req, res) => {
  res.send(chats);
});

routes.get("/api/chats/:id", (req, res) => {
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});

module.exports = routes;
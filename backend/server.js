const express = require('express');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

const chats = require('./data/data');

app.get('/',(req,res)=>{
    res.send("App is running")
})

app.get("/api/chats",(req,res)=>{
    res.send(chats);
})

app.get("/api/chat/:id",(req,res)=>{
    const singleChat = chats.find((c)=> c._id===req.params.id);
    res.send(singleChat);
})

app.listen(PORT,async()=>{
    console.log(`Server started on port ${PORT}`);
})

const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const app = express();
dotenv.config();
const routerProvider = require('./rotutes/routes');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/',routerProvider)

// app.get('/',(req,res)=>{
//     res.send("App is running")
// })

// app.get("/api/chats",(req,res)=>{
//     res.send(chats);
// })

// app.get("/api/chat/:id",(req,res)=>{
//     const singleChat = chats.find((c)=> c._id===req.params.id);
//     res.send(singleChat);
// })
const PORT = process.env.PORT || 5000;

app.listen(PORT,async()=>{
    console.log(`Server started on port ${PORT}`);
})

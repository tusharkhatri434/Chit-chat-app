const mongoose = require('mongoose');

async function connect(){
    await mongoose.connect("mongodb://127.0.0.1:27017/chit_chat_app");
    console.log("connection established");
}

module.exports = connect;
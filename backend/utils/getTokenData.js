const jwt = require('jsonwebtoken');

const  getTokenId = (token)=>{
   return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = getTokenId;
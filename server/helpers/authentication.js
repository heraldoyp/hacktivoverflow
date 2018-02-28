const jwt = require('jsonwebtoken')
require('dotenv').config()

const authentication = (req, res, next)=>{
  jwt.verify(req.headers.token, process.env.JWT, function(err, decoded){
    if(!err){
      console.log("jwt approved")
      next()
    }else{
      res.status(500).send({message:"JWT GAADA BRO"})
    }
  })
}

module.exports = authentication
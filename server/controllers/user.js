const User = require('../models/user.js')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const findAll = (req, res)=>{
  User.find()
    .then(data=>{
      res.status(200).send({message:'user has been found', data: data})
    })
    .catch(error=>{
      res.status(404).send({message: 'user not found', error: error})
    })
}

const create = (req, res)=>{
  let data = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    isLogin: false
  }
  User.findOne({'username': req.body.username})
    .then(dataOne=>{
      if(dataOne){
        res.send({message: "dataOne", dataOne: dataOne})
      }else{
        User.create(data)
          .then(data=>{
            res.status(200).send({message:'created', data: data})
          })
          .catch(error=>{
            res.status(500).send({message: 'user failed to created', error: error})
          })
      }
    })
    .catch(error=>{
      res.send({message: "data not found", error: errors})
    }) 
}

const signIn = (req, res)=>{
  User.findOne({'username': req.body.username})
    .then(dataOne=>{
      let data = {
        username: dataOne.username,
        password: dataOne.password,
        email: dataOne.email,
        isLogin: true
      }
      if(dataOne){
        jwt.sign({data: data}, process.env.JWT, (err, token)=>{
          if(token){
            User.update({'_id': dataOne._id}, data)
              .then(dataUp=>{
                res.status(200).send({message: 'got token', data: dataOne, token: token})
              })
              .catch(errorUp=>{
                res.status(500).send({message: 'update data failed', error: error})
              })
          }
        })
      }else{
        res.status(404).send({message:'user not found', dataOne: dataOne})
      }
    })
    .catch(errorOne=>{
      res.status(404).send({message: "User not found"})
    })
}

const logOut = (req,res)=>{
  User.findById(req.params.idUser)
    .then(dataOne=>{
      let data = {
        username: dataOne.username,
        password: dataOne.password,
        email: dataOne.email,
        isLogin: false
      }
      User.update({'_id':req.params.idUser}, data)
        .then(data=>{
          res.status(201).send({message: "logout success", data: data})
        })
        .catch(error=>{
          console.log(error)
          res.status(500).send({message: "logout failed"})
        })
    })
    .catch(error=>{
      res.status(404).send({message: 'data not found', error: error})
    })
    
}

const findById = (req, res)=>{
  User.findById(req.params.idUser)
    .then(data=>{
      res.status(200).send({message: "data has found", data: data})
    })
    .catch(error=>{
      res.status(404).send({message: 'data not found', error: error})
    })
}

const destroy = (req, res)=>{
  User.remove({'_id': req.params.idUser})
    .then(data=>{
      res.status(200).send({message: 'data has been deleted', data: data})
    })
    .catch(error=>{
      res.status(500).send({message: "data cannot be deleted", error: error})
    })
}

module.exports = {findAll, findById, signIn, create, logOut, findById, destroy}

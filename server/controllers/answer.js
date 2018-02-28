const Answer = require('../models/answer')
const Question = require('../models/question')

const findAll = (req, res)=>{
  Answer.find()
  .populate('UserId')
  .populate('QuestionId')
    .then(data=>{
      res.status(200).send({message: "data has found", data: data})
    })
    .catch(error=>{
      res.status(404).send({message: "data not found", error: error})
    })
}

const create = (req, res)=>{
  let data = {
    a: req.body.a,
    vote: 0,
    UserId: req.body.UserId,
    QuestionId: req.params.idQuestion
  }
  Answer.create(data)
    .then(data=>{
      Question.update({'_id': req.params.idQuestion}, {$push: {AnswerList: data._id}})
        .then(dataQuestion=>{
          res.status(200).send({message: "answer has been created", data: data, dataQuestion: dataQuestion})
        })
        .catch(errorQuestion=>{
          res.status(500).send({message: "add to AnswerList failer", error: errorQuestion})
        })
    })
    .catch(error=>{
      res.status(500).send({message: "answer failed to create", error: error})
    })
}

const upVote = (req, res)=>{
  Answer.findById(req.params.idAnswer)
    .then(data=>{
      let objQ = {
        a: data.a,
        vote: data.vote + 1,
        UserId: data.UserId,
        QuestionId: data.QuestionId
      }
      Answer.update({'_id': req.params.idAnswer}, objQ)
        .then(dataUp=>{
          res.status(201).send({message: "data has been updated", dataUp: dataUp})
        })
        .catch(errorUp=>{
          res.status(500).send({message: "data cannot be updated", error: errorUp})
        })
    })
    .catch(error=>{
      res.status(404).send({message: 'answer not found', error: error})
    })
}

const downVote = (req, res)=>{
  Answer.findById(req.params.idAnswer)
    .then(data=>{
      let objQ = {
        a: data.a,
        vote: data.vote - 1,
        UserId: data.UserId,
        QuestionId: data.QuestionId
      }
      Answer.update({'_id': req.params.idAnswer}, objQ)
        .then(dataUp=>{
          res.status(201).send({message: "data has been updated", dataUp: dataUp})
        })
        .catch(errorUp=>{
          res.status(500).send({message: "data cannot be updated", error: errorUp})
        })
    })
    .catch(error=>{
      res.status(404).send({message: 'answer not found', error: error})
    })
}

const destroy = (req, res)=>{
  Answer.remove({'_id': req.params.idAnswer})
    .then(data=>{
      res.status(200).send({message: 'answer has been deleted', data: data})
    })
    .catch(error=>{
      res.status(500).send({message: 'data failed to delete', error: error})
    })
}

module.exports = {findAll, create, upVote, downVote, destroy}
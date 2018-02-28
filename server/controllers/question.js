const Question = require('../models/question')

const findAll = (req, res)=>{
  Question.find()
  .populate('UserId')
  .populate('AnswerList')
    .then(data=>{
      res.status(200).send({message: "data has found", data: data})
    })
    .catch(error=>{
      res.status(404).send({message: "data not found", error: error})
    })
}

const findOne = (req, res)=>{
  Question.findOne({'_id': req.params.idQuestion})
  .populate('UserId')
  .populate('AnswerList')
    .then(data => {
      res.status(200).send({message: "data found", data: data})
    })
    .catch(error => {
      res.status(404).send({message: "data not found", error: error})
    })
}

const create = (req, res)=>{
  let data = {
    title: req.body.title,
    q: req.body.q,
    category: req.body.category,
    vote: 0,
    UserId: req.body.UserId,
    AnswerList: []
  }
  Question.create(data)
    .then(data=>{
      res.status(200).send({message: "question has been created", data: data})
    })
    .catch(error=>{
      res.status(500).send({message: "question failed to create", error: error})
    })
}

const findCategory = (req, res)=>{
  Question.find({'category': req.body.category})
    .then(data=>{
      res.status(200).send({message: 'category found', data: data})
    })
    .catch(error=>{
      res.status(404).send({message: 'category not found', error: error})
    })
}

const upVote = (req, res)=>{
  Question.findById(req.params.idQuestion)
    .then(data=>{
      let objQ = {
        title: data.title,
        q: data.q,
        category: data.category,
        vote: data.vote + 1,
        UserId: data.UserId,
        AnswerList: data.AnswerList
      }
      Question.update({'_id': req.params.idQuestion}, objQ)
        .then(dataUp=>{
          res.status(201).send({message: "data has been updated", dataUp: dataUp})
        })
        .catch(errorUp=>{
          res.status(500).send({message: "data cannot be updated", error: errorUp})
        })
    })
    .catch(error=>{
      res.status(404).send({message: 'question not found', error: error})
    })
}

const downVote = (req, res)=>{
  Question.findById(req.params.idQuestion)
    .then(data=>{
      let objQ = {
        title: data.title,
        q: data.q,
        category: data.category,
        vote: data.vote - 1,
        UserId: data.UserId,
        AnswerList: data.AnswerList
      }
      Question.update({'_id': req.params.idQuestion}, objQ)
        .then(dataUp=>{
          res.status(201).send({message: "data has been updated", dataUp: dataUp})
        })
        .catch(errorUp=>{
          res.status(500).send({message: "data cannot be updated", error: errorUp})
        })
    })
    .catch(error=>{
      res.status(404).send({message: 'question not found', error: error})
    })
}

const addAnswer = (req, res)=>{
  Question.findById(req.params.idQuestion)
  .then(data=>{
    let objQ = {
      title: data.title,
      q: data.q,
      category: data.category,
      vote: data.vote,
      UserId: data.UserId,
      AnswerList: req.body.AnswerList
    }
    Question.update({'_id': req.params.idQuestion}, objQ)
      .then(dataUp=>{
        res.status(201).send({message: "data has been updated", dataUp: dataUp})
      })
      .catch(errorUp=>{
        res.status(500).send({message: "data cannot be updated", error: errorUp})
      })
  })
  .catch(error=>{
    res.status(404).send({message: 'question not found', error: error})
  })
}

const destroy = (req, res)=>{
  Question.remove({'_id': req.params.idQuestion})
    .then(data=>{
      res.status(200).send({message: 'question has been deleted', data: data})
    })
    .catch(error=>{
      res.status(500).send({message: 'data failed to delete', error: error})
    })
}

module.exports = {findAll, findOne ,create, findCategory, upVote, downVote, addAnswer, destroy}
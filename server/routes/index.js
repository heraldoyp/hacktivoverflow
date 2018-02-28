var express = require('express');
var router = express.Router();
const User = require('../controllers/user')
const Question = require('../controllers/question')
const Answer = require('../controllers/answer')
const authentication = require('../helpers/authentication')

/* GET home page. */

router.get('/', User.findAll)
router.post('/', User.create)
router.post('/signin', User.signIn)
router.get('/logout/:idUser' ,User.logOut)
router.get('/user/:idUser', User.findById)
router.delete('/user/:idUser', User.destroy)

router.get('/question', Question.findAll)
router.get('/question/:idQuestion', Question.findOne)
router.post('/question', authentication, Question.create)
router.post('/question/category', Question.findCategory)
router.get('/question/:idQuestion/upvote', authentication, Question.upVote)
router.get('/question/:idQuestion/downvote', authentication, Question.downVote)
router.put('/question/:idQuestion/addanswer', authentication, Question.addAnswer)
router.delete('/question/:idQuestion', authentication, Question.destroy)

router.get('/answer/:idQuestion', Answer.findAll)
router.post('/question/:idQuestion/answer', Answer.create)
router.put('/answer/:idAnswer/upvote', authentication, Answer.upVote)
router.put('/answer/:idAnswer/downvote', authentication, Answer.downVote)
router.delete('/answer/:idAnswer', authentication, Answer.destroy)

module.exports = router;

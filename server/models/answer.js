var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answerSchema = new Schema({
  a: String,
  vote: Number,
  UserId: {type: Schema.Types.ObjectId, ref:'User'},
  QuestionId: {type: Schema.Types.ObjectId, ref:'Question'}
});

var Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer

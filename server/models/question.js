var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  title: String,
  q: String,
  vote: Number,
  category: String,
  UserId: {type: Schema.Types.ObjectId, ref:'User'},
  AnswerList: [{type: Schema.Types.ObjectId, ref: 'Answer'}]
});

var Question = mongoose.model('Question', questionSchema);

module.exports = Question
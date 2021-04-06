var mongoose = require('mongoose');
const responseSchema = new mongoose.Schema({
  courseId:String,
  testId:String,
  studId:String,
  correctAns:Number,
  WrongAns:Number,
  unattempted:Number,
  attempted:Number,
  ans:[String],
  Name : String
});
const Response = mongoose.model("response",responseSchema);
module.exports = Response;

var mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
  teachID:String,
  name:String,
  teachName:String,
  studentID :[String],
  testID:[String]
});
const Course = mongoose.model("course",courseSchema);
module.exports = Course;

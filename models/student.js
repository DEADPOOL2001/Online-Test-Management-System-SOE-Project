var mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
  fName : String,
  Lname : String,
  Uname : String,
  email : String,
  Address : String,
  Password : String,
  Country : String,
  State : String,
  Zip_code : Number,
  courseId :[String]
});
const Stud = mongoose.model("student",studentSchema);

module.exports = Stud;

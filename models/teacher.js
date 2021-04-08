var mongoose = require('mongoose');
const teacherSchema = new mongoose.Schema({
  fName : String,
  Lname : String,
  Uname : String,
  email : String,
  Address : String,
  Password : String,
  Country : String,
  State : String,
  Zip_code : Number
});
const Teacher = mongoose.model("teacher",teacherSchema);

module.exports = Teacher;

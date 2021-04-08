var mongoose = require('mongoose');
const testSchema = new mongoose.Schema({
    Shour: Number,
    Smin : Number,
    Durhour : Number,
    Durmin: Number,
    Question: [String],
    Op1: [String],
    Op2: [String],
    Op3: [String],
    Op4: [String],
    Answer: [Number],
    courseId:String
});
const test = mongoose.model("test", testSchema);

module.exports = test;

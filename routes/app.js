var express = require('express');
var router = express.Router();
var teacher = require('../models/teacher');
var student = require('../models/student');
var course = require('../models/course');
var test = require('../models/test');
var response = require('../models/response');
var currTeacherID ;
var currStudentID;
var currCourseID;
var currTestID;
var currReaponseID;
var currTeacher;
var currStudent;
var currCourse;
var currTest;
var currResponse;
var courseArray;
var course1;
var course2;
var coureArray1;
var currTest;
var message;
var nowTest;
var resArray;
var Shour;
var Smin ;
var Durhour;
var Durmin;
var Question=[];
var Op1=[];
var Op2=[];
var Op3=[];
var Op4=[];
var Answer=[];
router.get("/", function(req, res) {
  res.render('index');
});
router.post("/", function(req, res) {
  console.log(req.body);
  let ind=parseInt(req.body.number, 10);
  console.log(ind);
  course1 = currCourse[ind];
  console.log(course1);
  res.redirect("/course");
});
router.post("/1", function(req, res) {
  console.log(req.body);
  let ind=parseInt(req.body.number, 10);
  console.log(ind);
  console.log(currCourse);
  course2=currCourse[ind];
  console.log(course2);
  res.redirect("/stud_course");
});
router.get("/stud_course",async function(req, res) {
  console.log(message);
  currTest=[];
  for(var i=0;i<course2.testID.length;i++){
    await test.findOne({ _id:course2.testID[i] }, (err, data2) => {
          currTest.push(data2);
      });
  }
  console.log(currTest);
  res.render('stud_course',{course:course2,message:message,Test:currTest});
  message="";
});
router.post("/2", function(req, res) {
  console.log(req.body);
  let ind=parseInt(req.body.number, 10);
  console.log(ind);
  nowTest=currTest[ind];
  console.log(nowTest);
  res.redirect("/test12");
});
router.post("/3",async function(req, res) {
  console.log(req.body);
  var corrAns=0;
  var corrWrong=0;
  var attempt=0;
  var unattempt=0;
  var ans=Object.values(req.body);
  for(i=0;i<ans.length;i++){
    if(!ans[i]){
      unattempt++;
    } else {
      attempt++;
      if(nowTest.Answer[i]==ans[i]){
        corrAns++;
      } else {
        corrWrong++;
      }
    }
    console.log(nowTest.Answer[i]);
  }
  var RESPONSE = new response({
    courseId:nowTest.courseId,
    testId:nowTest._id,
    studId:currStudent._id,
    correctAns:corrAns,
    WrongAns:corrWrong,
    unattempted:unattempt,
    attempted:attempt,
    ans:ans,
    Name:currStudent.fName,
    email:currStudent.email
  });
  console.log(currStudent);
  console.log(RESPONSE);
  await RESPONSE.save(async (err, ad) => {
    if (err)
      console.log(err);
    else{
      console.log(ad._id);
      console.log("sucess");
      message="Your Response has been recorded";
    }
  });
  res.redirect("/stud_course");
});
router.get("/test12",function(req, res) {
  var current = new Date();
  var hour =current.getHours();
  var min=current.getMinutes();
  var totalmin=nowTest.Durhour*60+nowTest.Shour*60+nowTest.Smin+nowTest.Durmin;
  var endHour=Math.floor(totalmin/60);
  var endMin=totalmin%60;
  console.log(hour);
  console.log(min);
  var restHour=Math.floor((endHour*60-hour*60+endMin-min)/60);
  var restMin=(endHour*60-hour*60+endMin-min)%60;
  if(hour*60+min<nowTest.Shour*60+nowTest.Smin){
    message="Test is not started yet";
    res.redirect("/stud_course");
  }
  else{
    response.findOne({testId:nowTest._id,studId:currStudent._id},(err,data2) =>{
      if(!data2){
        if(endHour*60+endMin>hour*60+min){
          res.render('test_page',{Test:nowTest,H:restHour,M:restMin});
        } else {
          message="You Have Not Attempted The Test";
          res.redirect("/stud_course");
        }
      } else {
        currResponse=data2;
        res.redirect("/response");
      }
    });
  }
});
router.post("/4",async function(req, res) {
  console.log(req.body);
  let ind=parseInt(req.body.number, 10);
  console.log(ind);
  nowTest=currTest[ind];
  console.log(nowTest);
  response.find({testId:nowTest._id},(err,data)=>{
    if(err)
    console.log(err);
    else{
      resArray=data;
      res.redirect("/Res");
    }
  });
});
router.get("/Res",async function(req, res) {
  console.log(resArray);
  res.render('Res',{response:resArray,Test:nowTest});
});
router.get("/response",async function(req, res) {
  res.render('response',{Test:nowTest,response:currResponse,stud:currStudent,course:course2});
});
router.get("/course",async function(req, res) {
  console.log(message);
  console.log(course1);
  currTest=[];
  await course.findOne({ _id:course1._id }, (err, data2) => {
        course1=data2;
        console.log("end");
    });
  for(var i=0;i<course1.testID.length;i++){
    await test.findOne({ _id:course1.testID[i] }, (err, data2) => {
          currTest.push(data2);
      });
  }
  console.log(currTest);
  await res.render('course',{course:course1,message:message,Test:currTest});
  message="";
});
router.post("/course",async function(req, res) {
  var em=req.body.email;
  console.log(em);
  await student.findOne({ email: em}, (err, data) => {
        console.log(data);
				if (!data) {
          message="No student found";
				} else {
          console.log(course1._id);
          var found ;
          for(var it=0;it<data.courseId;it++){
            if(data.courseId[it]==course1._id)
            found=course1._id;
          }
          console.log(found);
          if(found===course1._id){
            message="already registered";
          }
          else {
            student.updateOne({email:em}, { $addToSet: { courseId: course1._id } }, function(err1, res1) {
                if (err1) throw err1;
                console.log(" document(s) updated");
            });
            student.findOne({ email: em }, (err1, data1) => {
                  console.log(data1);
              });
            message="Sucess";
          }
				}
		});
  res.redirect("/course");
});
router.get("/ADMIN", function(req, res) {
  res.render('admin_log');
});
router.get("/STUDENT", function(req, res) {
  res.render('stud_log',{message:message});
  message="";
  console.log(message);
});
router.get("/TEACHER", function(req, res) {
  res.render('teacher_log',{message:message});
  message="";
  console.log(message);
});
router.get("/stud_reg", function(req, res) {
  res.render('student_reg',{message:message});
  message="";
  console.log(message);
});
router.get("/teach_reg", function(req, res) {
  res.render('teach_reg',{message:message});
  message="";
  console.log(message);
});
router.get("/admin_reg", function(req, res) {
  res.render('admin_reg',{message:message});
});
router.get("/Post_teach", function(req, res) {
  course.find({teachID: currTeacherID},(err,data)=>{
    if(err)
    console.log(err);
    else
    res.render('post_log_teach',{course:data,name:currTeacher.fName});
    currCourse=data;
    console.log(currCourse);
  });
});

var i=1;
router.get("/TEST",function (req,res) {
  res.render("reg_tea",{ counter: i });
});

router.post("/finish",async function (req,res) {
  Question.push(req.body.q);
  Op1.push(req.body.op1);
  Op2.push(req.body.op2);
  Op3.push(req.body.op3);
  Op4.push(req.body.op4);
  Answer.push(req.body.ans);
  if(i===1){
    let x=req.body.Stime.split(":");
    Shour=parseInt(x[0], 10);
    Smin=parseInt(x[1], 10);
    let y=req.body.Dur.split(":");
    Durmin=parseInt(y[1], 10);
    Durhour=parseInt(y[0], 10);
  }
  var Test = new test({
    Shour: Shour,
    Smin : Smin,
    Durhour : Durhour,
    Durmin: Durmin,
    Question: Question,
    Op1: Op1,
    Op2: Op2,
    Op3: Op3,
    Op4: Op4,
    Answer: Answer,
    courseId:course1._id
  });
  console.log(Test);
  await Test.save(async (err, ad) => {
    if (err)
      console.log(err);
    else{
      console.log(ad._id);
      await course.updateOne({_id:course1._id}, { $addToSet: { testID: ad._id } },async function(err1, res1) {
          if (err1) throw err1;
          message="Your test was created";
          console.log(res1);
      });
    }
  });
  console.log(course1);
  console.log("hi");
  Question=[];
  Op1=[];
  Op2=[];
  Op3=[];
  Op4=[];
  Answer=[];
  i=1;
  res.redirect("/course");
});

router.get("/next",function (req,res) {
  res.render("reg_tea",{counter: i});
})
router.post("/next",function (req,res) {
  console.log(req.body);
  Question.push(req.body.q);
  Op1.push(req.body.op1);
  Op2.push(req.body.op2);
  Op3.push(req.body.op3);
  Op4.push(req.body.op4);
  Answer.push(req.body.ans);
  if(i===1){
    let x=req.body.Stime.split(":");
    Shour=parseInt(x[0], 10);
    Smin=parseInt(x[1], 10);
    let y=req.body.Dur.split(":");
    Durmin=parseInt(y[1], 10);
    Durhour=parseInt(y[0], 10);
  }
  i++;
  res.redirect("/next");
})


router.post("/Post_teach",function(req,res){
  console.log(req.body);
  let name = req.body.name;
  console.log(req.body.formName);
  console.log(req);
  var newCourse= new course({
    teachID:currTeacherID,
    name:name,
    teachName:currTeacher.fName,
    studentID :[],
    testID:[]
  });
  newCourse.save((err, Person) => {
    if (err)
      console.log(err);
    else
      console.log('Success');
  });
  console.log(newCourse);
  res.redirect("/Post_teach");
});
router.post("/",function(req,res){
  res.redirect("/");
});
router.post("/stud_reg",function(req,res){
  console.log(req.body);
  var personInfo =req.body;
  var flag;
  teacher.findOne({ email: personInfo.email }, (err1, data1) => {
        console.log(data1);
        flag=data1;
    });
  student.findOne({ email: personInfo.email }, (err, data) => {
				if (!data && !flag) {
          var newPerson = new student({
            fName: personInfo.fname,
            Lname: personInfo.lname,
            uname:"no",
            email:personInfo.email,
            Address : personInfo.add,
            Password : personInfo.pass,
            Country : personInfo.country,
            State : personInfo.state,
            Zip_code : personInfo.zip
          });
          console.log(newPerson);
          if(!data)
          newPerson.save((err, Person) => {
            if (err)
              console.log(err);
            else
              console.log('Success');
          });
          message="Sucessful registration";
          res.redirect("/STUDENT");
				} else {
					message="Email already registered";
          res.redirect("/stud_reg");
				}
		});
});
router.post("/teach_reg",function(req,res){
  console.log(req.body);
  var personInfo =req.body;
  var flag;
  student.findOne({ email: personInfo.email }, (err1, data1) => {
        console.log(data1);
        flag=data1;
    });
  teacher.findOne({ email: personInfo.email }, (err, data) => {
				if (!data && !flag) {
          var newPerson = new teacher({
            fName: personInfo.fname,
            Lname: personInfo.lname,
            uname:"no",
            email:personInfo.email,
            Address : personInfo.add,
            Password : personInfo.pass,
            Country : personInfo.country,
            State : personInfo.state,
            Zip_code : personInfo.zip
          });
          console.log(newPerson);
          if(!data)
          newPerson.save((err, Person) => {
            if (err)
              console.log(err);
            else
              console.log('Success');
          });
          message="Sucessful registration";
          res.redirect("/TEACHER");
				} else {
					message="Email already registered";
          res.redirect("/teach_reg");
				}

		});
});
router.get("/slog",async function(req,res){
  var ar=[];
  console.log(currStudent.courseId);
  for(let j=0;j<currStudent.courseId.length;j++){
    await course.findOne({ _id:currStudent.courseId[j] }, (err, data2) => {
  				ar.push(data2);
  		});
  }
  console.log(ar);
  currCourse=ar;
  res.render("slog_post",{course:currCourse,name:currStudent.fName});
});
router.post("/STUDENT",function(req,res){
  console.log(req.body);

  var loginfo =req.body;
  student.findOne({ email: loginfo.email,Password: loginfo.pass }, (err, data) => {
				if (!data) {
          message="Wrong Password or email ID.";
          res.redirect("/STUDENT");
				} else {
          currStudentID=data._id;
          currStudent=data;
          console.log(currStudent);
          message="";
          res.redirect("/slog");
				}

		});

});
router.post("/TEACHER",function(req,res){
  console.log(req.body);

  var loginfo =req.body;
  teacher.findOne({ email: loginfo.email,Password: loginfo.pass }, (err, data) => {
				if (!data) {
          message="Wrong Password or email ID.";
          res.redirect("/TEACHER");
				} else {
          currTeacherID=data._id;
          currTeacher=data;
          console.log(currTeacher);
          res.redirect("/Post_teach");
				}

		});

});
module.exports = router;

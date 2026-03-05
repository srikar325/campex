let mongoose=require("mongoose");
let attendanceschema=require("../schemas/attendanceschema");
let attendancetrack=mongoose.model("attendancetrack",attendanceschema);
module.exports=attendancetrack;
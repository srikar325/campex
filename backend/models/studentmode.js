let mongoose=require("mongoose");
let studentschema=require("../schemas/studentschema");
let student=mongoose.model("student",studentschema);
module.exports=student;

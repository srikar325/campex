let mongoose=require("mongoose");
let subject=mongoose.model("subject",subjectschema);
module.exports=subject;
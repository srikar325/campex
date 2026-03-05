let mongoose=require("mongoose");
let holidayschema=require("../schemas/holidayschema");
let holiday=mongoose.model("holiday",holidayschema);
module.exports=holiday;
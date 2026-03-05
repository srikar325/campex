let mongoose=require("mongoose");
let departmentschema=require("../schemas/departmentschema");
let department=mongoose.model("department",departmentschema);
module.exports=department;
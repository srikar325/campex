let mongoose=require("mongoose");
let subjectschema= new mongoose.Schema({
    name:{
        type:String
    },
    teacher:{
        type:String
    },
    place:{
        type:String
    }
})
module.exports=subjectschema;
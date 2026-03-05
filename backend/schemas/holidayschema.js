let mongoose=require("mongoose");
let holidayschema=new mongoose.Schema({
    depname:{
        type:String
    },
    section:{
        type:String
    },
    holidaydate:[
        {type:Date}
    ]
})
 module.exports=holidayschema;
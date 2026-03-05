let mongoose=require("mongoose");
let attendanceschema=new mongoose.Schema({
    studentid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"student"
    },
    date:{
        type:String
    },
    subject:[
        {
            subjectname:{
                type:String
            },
            time:{
                            type:String
    
            },
            status:{
                type:String
            }
        }
    ]
})
module.exports=attendanceschema;
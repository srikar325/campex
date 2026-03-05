let mongoose=require("mongoose");
let passportlocalmongoose=require("passport-local-mongoose").default;
let subjectschema=new mongoose.Schema({
    subjectname:{
        type:String
    },
    present:{
        type:Number,
        default:0
    },
       conducted:{
        type:Number,
        default:0
    }
})
subjectschema.virtual("subjectattendance").get(function(){
    if(this.conducted==0){
        return(0);
    }else{
        let subjectattendance=(this.present/this.conducted)*100;
        return(subjectattendance);
    }
})
subjectschema.set("toJSON", { virtuals: true });
subjectschema.set("toObject", { virtuals: true });
let studentschema= new mongoose.Schema({
    name:{
        type:String
    },
    username:{
        type:String
    },
    email:{
        type:String
    },
    department:{
        type:String
    },
    section:{
        type:String
    },
subject:[subjectschema]
})
studentschema.plugin(passportlocalmongoose);
studentschema.virtual("totalattendance").get(function(){
    let totalpresent=0;
    let totalconducted=0;
    this.subject.map((sub)=>{
        totalpresent+=sub.present;
        totalconducted+=sub.conducted;

    })
    if(totalconducted==0){
        return(0);
    }else{
let totalattendance=(totalpresent/totalconducted)*100;
return(totalattendance);
    }
})
module.exports=studentschema;
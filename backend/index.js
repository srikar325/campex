let express=require("express");
let app=express();
let cors=require("cors");
let mongoose=require("mongoose");
require("dotenv").config();
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));
app.use(express.json());
let port=3002;
let student=require("./models/studentmode.js");
let session=require("express-session");
let flash=require("connect-flash");
let passport=require("passport");
let local_strat=require("passport-local")
app.use(session({
  secret: "mysupersecretkey",
  resave: false,
  saveUninitialized: false,
  rolling:true,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use(new local_strat(student.authenticate()));

passport.serializeUser(student.serializeUser());
passport.deserializeUser(student.deserializeUser());
let department=require("./models/departmentmodel.js");
let authroutes=require("./routes/authroutes.js");   
let studentschema=require("./schemas/studentschema.js") ;
let holiday=require("./models/holidaymodel.js");
studentschema.set("toJSON", { virtuals: true });
studentschema.set("toObject", { virtuals: true });
                         let attendancetrack=require("./models/attendancemodel.js");
                         // serversatrting
app.listen(port,()=>{
    console.log("server started");
    mongoose.connect(process.env.mongoose_url).then(()=>{
        console.log("connected");
    })
    console.log("database connected");
})

                              
      // isloggedmiddleware
let islogged=(req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
        res.send({message:"notloggedin"});
    }
}

                   // homeroot
app.get("/",islogged,async(req,res)=>{
    let dep=  await department.findOne({depname:req.user.department,section:req.user.section});
let holi= await holiday.findOne({depname:req.user.department,section:req.user.section});
    res.json({user:req.user,timetable:dep.subject,holiday:holi,replacetimetable:dep.replacesubject})
});

app.use("/auth",authroutes);
app.get("/:id/:date",async (req,res)=>{
    let{id,date}=req.params;
    let att= await attendancetrack.findOne({"studentid":id,"date":date})
    let newattendance;
    if(att==null){
        newattendance= new attendancetrack({
            "studentid":id,
            "date":date
        })
        newattendance.save();
        res.json({attendance:newattendance})
    }
    if(att){
res.json({attendance:att});

    }
})

app.post("/:id/:status/:subject/:todaydate/:time",async(req,res)=>{
    let{id,status,subject,todaydate,time}=req.params;
    console.log(id);
    console.log(status);
    console.log(subject);
    console.log(todaydate);
    console.log(time);

    if(status=="present"){  
 let stu= await student.findOneAndUpdate({_id:id,"subject.subjectname":subject},{$inc:{ 
    "subject.$.present":1,
        "subject.$.conducted":1,
}
    })
    console.log(stu);

}else if(status=="absent"){
  let stu= await student.findOneAndUpdate({_id:id,"subject.subjectname":subject},{$inc:{ 
            "subject.$.conducted":1,

}
     })   
    
}

let att=  await attendancetrack.findOneAndUpdate({"studentid":id,"date":todaydate},{$push:
    {"subject":{
"subjectname":subject,
"time":time,
"status":status
    }}});
   res.json({message:"success"})
    
})
app.delete("/:id/:subjectname/:todaydate/:time",async(req,res)=>{
    let{id,subjectname,todaydate,time}=req.params;

    let att= await attendancetrack.findOne({studentid:id,date:todaydate,"subject.subjectname":subjectname,"subject.time":time});
    console.log(att);
   let prev= att.subject.filter((sub)=>sub.subjectname==subjectname && sub.time==time)
   let status=prev[0].status;
   if(status=="present"){
    let stu= await student.findOneAndUpdate({_id:id,"subject.subjectname":subjectname},{$inc:{
"subject.$.present":-1,
"subject.$.conducted":-1,

    }})
   }else if(status=="absent"){
      let stu= await student.findOneAndUpdate({id,"subject.subjectname":subjectname},{$inc:{
"subject.$.conducted":-1,

    }})
   }
   let atts= await attendancetrack.findOneAndUpdate({studentid:id,date:todaydate},{$pull:{subject:{

   
    "subjectname":subjectname,
    "time":time
 } }})
    res.json({message:"success"});
})


let express=require("express");
let app=express();
let cors=require("cors");
require("dotenv").config();
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));
app.use(express.json());
let student=require("../models/studentmode.js");
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
let department=require("../models/departmentmodel.js");
        let router=express.Router();
     
router.post("/signup",async(req,res)=>{
    try{
    let depid= await department.findOne({section:`${req.body.section}`,depname:`${req.body.department}`})
let subjects=depid ?depid.allsubject.map((sub)=>{
    return({
        subjectname:sub.subjectname,
        present:0,
        conducted:0
    })
}):[]
  let registerstudent=  await student.register({
        username:req.body.username,
        name:req.body.name,
        email:req.body.email,
        section:req.body.section,
        department:req.body.department,
        subject:subjects
    },req.body.password);
            req.login(registerstudent, err => {
            if (err) return res.status(500).json({ message: err.message });
            console.log("Student registered and logged in successfully");
            res.json({ message: "success", user: registerstudent});
        });

    }
catch(err){
    res.json({message:err});
}
})
router.post("/login",passport.authenticate("local"),(req,res)=>{
res.json({message:"loggedin",user:req.user});
})
let logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err)
        }else{
            next();
        }
    })
}
router.get("/logout",logout,(req,res)=>{

res.json({message:"loggout"});
})
module.exports=router
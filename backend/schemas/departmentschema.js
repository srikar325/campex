let mongoose=require("mongoose");
let replacetimetableschema= new mongoose.Schema({
    duration:{
        startdate:{
            type:Date
        },
        enddate:{
            type:Date
        }
    },
    monday:[ 
        {
subjectname:String,
time:String

        }
    ],
        tuesday:[ 
        {
subjectname:String,
time:String
        }
    ],
        wednesday:[ 
        {
subjectname:String,
time:String


        }
    ],
        thursday:[ 
        {
subjectname:String,
time:String

        }
    ],
        friday:[ 
        {
subjectname:String,
time:String

        }
    ],
        saturday:[ 
        {
subjectname:String,
time:String
        }
    ],
        sunday:[ 
        {
subjectname:String,
time:String
        }
    ]
})
let timetableschema= new mongoose.Schema({
    duration:{
        startdate:{
            type:Date
        },
        enddate:{
            type:Date
        }
    },
    monday:[ 
        {
subjectname:String,
time:String

        }
    ],
        tuesday:[ 
        {
subjectname:String,
time:String
        }
    ],
        wednesday:[ 
        {
subjectname:String,
time:String


        }
    ],
        thursday:[ 
        {
subjectname:String,
time:String

        }
    ],
        friday:[ 
        {
subjectname:String,
time:String

        }
    ],
        saturday:[ 
        {
subjectname:String,
time:String
        }
    ],
        sunday:[ 
        {
subjectname:String,
time:String
        }
    ]
})
let departmentschema= new mongoose.Schema({
    depname:{
        type:String
    },
    section:{
        type:String
    },
    subject:timetableschema,
    allsubject:[ 
    {
        subjectname:String
    }
],
    replacesubject:replacetimetableschema

})
module.exports=departmentschema;
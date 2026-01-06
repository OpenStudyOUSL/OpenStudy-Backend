import mongoose from "mongoose";

const leaderbordSchema = mongoose.Schema({
    userName : {    
        type : String,
        required : true
    },
    profilePicture : {
        type : String,
        default : "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1741237617~exp=1741241217~hmac=317dc59cde51436c06324058328a30a0fe685776061526f9ecd0a876e373f3db&w=740"
    },
    totalScore : {
        type : Number,
        required : true,
        default : 0
    },
    rank : {
        type : Number,
        required : true
    },
    quizzesTaken : {
        type : Number,
        required : true,
        default : 0
    },
    correctAnswers : {
        type : Number,
        required : true,
        default : 0
    },
    wrongAnswers : {
        type : Number,
        required : true,
        default : 0
    },

})

const leaderbord = mongoose.model("leaderbord", leaderbordSchema) 

export default leaderbord;
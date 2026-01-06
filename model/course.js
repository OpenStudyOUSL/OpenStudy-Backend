import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
    courseId : {
        type : String,
        required : true,
        unique : true
    },
    courseName : {
        type : String,
        required : true
    },
    courseDescription : {
        type : String,
        required : true
    },
    courseTutor : {
        type : String,
        required : true
    },
    courseImage : {
        type : String,
        default : "https://www.freepik.com/free-photo/3d-render-online-education-survey-test-concept_33062156.htm#fromView=search&page=1&position=3&uuid=f7148667-9281-4c54-b24c-9dbda1a1482d&query=course"
    }
})

const course = mongoose.model("course", courseSchema) 

export default course;
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";

import userRouter from './routes/userRouter.js';
import courseRouter from './routes/courseRouter.js';
import quizRouter from './routes/quizRouter.js';
import contactRouter from "./routes/contactRouter.js"; // ✅ ADD

dotenv.config()

const app = express();

const mongoUrl = process.env.MONGO_DB_URI

app.use(cors())

mongoose.connect(mongoUrl,{})

const connection = mongoose.connection;

connection.once("open",()=>{
    console.log("Database connected");
})

app.use(bodyParser.json())

app.use(
    (req, res, next)=>{

        const token = req.header("Authorization")?.replace("Bearer ", "")

        if(token != null ){
            jwt.verify(token, process.env.SECRET_KEY, (error, decoded)=>{
                if(!error){
                    req.user = decoded
                }
            })
        }
        next()
    }
)

app.use("/api/users", userRouter)
app.use("/api/courses", courseRouter)
app.use("/api/quizzes", quizRouter)
app.use("/api/contact", contactRouter) // ✅ ADD

app.listen(
    3000,
    ()=>{
        console.log("sever running port 3000");
    }
)

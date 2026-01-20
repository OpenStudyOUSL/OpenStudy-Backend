import express from "express";
import {
  createQuiz,
  getAllQuizzes,
  getQuizzesByCourse,
  getQuizzesByTopic,
  updateQuiz,
  deleteQuiz,
  getQuizCount,
  getQuizCountByCourse,
} from "../controllers/quizController.js";

const quizRouter = express.Router();

// Create quiz
quizRouter.post("/", createQuiz);

// Read quizzes
quizRouter.get("/", getAllQuizzes);
quizRouter.get("/course/:courseId", getQuizzesByCourse);
quizRouter.get("/course/:courseId/topic/:topic", getQuizzesByTopic);
quizRouter.get("/count", getQuizCount);
quizRouter.get("/count/:courseId", getQuizCountByCourse);

// Update quiz
quizRouter.put("/:id", updateQuiz);

// Delete quiz
quizRouter.delete("/:id", deleteQuiz);

export default quizRouter;

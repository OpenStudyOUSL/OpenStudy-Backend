import express from "express";
import {
  createQuiz,
  getAllQuizzes,
  getQuizzesByTopic,
  updateQuiz,
  deleteQuiz,
  getQuizCount,
  getQuizzesCountByTopic,
  getQuizzesCountAndTopicsByCourse,
} from "../controllers/quizController.js";

const quizRouter = express.Router();

// Create quiz
quizRouter.post("/", createQuiz);

// Read quizzes
quizRouter.get("/", getAllQuizzes);
quizRouter.get("/course/:courseId/topic/:topic", getQuizzesByTopic);
quizRouter.get("/count", getQuizCount);
quizRouter.get("/:courseId/:topic/count", getQuizzesCountByTopic);
quizRouter.get("/:courseId", getQuizzesCountAndTopicsByCourse);

// Update quiz
quizRouter.put("/:id", updateQuiz);

// Delete quiz
quizRouter.delete("/:id", deleteQuiz);

export default quizRouter;

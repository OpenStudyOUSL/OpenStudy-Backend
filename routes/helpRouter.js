import express from "express";
import {
  getTopics,
  createTopic,
  deleteTopic,
  addReply,
} from "../controllers/helpController.js";

const topicRouter = express.Router();

topicRouter.get("/", getTopics);
topicRouter.post("/", createTopic);
topicRouter.delete("/:id", deleteTopic);
topicRouter.post("/:id/replies", addReply);

export default topicRouter;

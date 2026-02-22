import express from "express";
import {
  getLeaderboard,
  updateLeaderboard,
} from "../controllers/leaderboardController.js";

const leaderboardRouter = express.Router();

// Read leaderboard entries
leaderboardRouter.get("/", getLeaderboard);

// Update specific student's score
leaderboardRouter.post("/update", updateLeaderboard);

export default leaderboardRouter;

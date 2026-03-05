import express from "express";
import {
  getLeaderboard,
  updateLeaderboard,
  getUserStats,
} from "../controllers/leaderboardController.js";

const leaderboardRouter = express.Router();

// Read leaderboard entries
leaderboardRouter.get("/", getLeaderboard);

// Get specific user's stats
leaderboardRouter.get("/user-stats", getUserStats);

// Update specific student's score
leaderboardRouter.post("/update", updateLeaderboard);

export default leaderboardRouter;

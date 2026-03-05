import Leaderboard from "../model/leaderbord.js";
import User from "../model/user.js";

// Fetch leaderboard, sorted by score descending
export const getLeaderboard = async (req, res) => {
  try {
    // We sort the raw leaderboard collection by totalScore (descending)
    const leaderboardEntries = await Leaderboard.find().sort({ totalScore: -1 });

    // Calculate rank for each dynamically (handling ties if necessary, but simple index-based approach for now)
    const rankedLeaderboard = leaderboardEntries.map((entry, index) => {
      // mongoose documents must be converted to raw objects to add custom fields sometimes,
      // but if we just want to send them, we can build a new object
      return {
        _id: entry._id,
        userName: entry.userName,
        profilePicture: entry.profilePicture,
        totalScore: entry.totalScore,
        quizzesTaken: entry.quizzesTaken,
        correctAnswers: entry.correctAnswers,
        wrongAnswers: entry.wrongAnswers,
        rank: index + 1, // dynamically computed 
      };
    });

    res.status(200).json(rankedLeaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update or insert a user score
export const updateLeaderboard = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized. Please login to save quiz results." });
    }

    const { score, totalQuestions } = req.body;

    if (score === undefined || totalQuestions === undefined) {
      return res.status(400).json({ message: "Score and totalQuestions are required" });
    }

    const userName = user.userName;
    
    // Always fetch fresh profile picture from User DB in case it changed
    const freshUser = await User.findOne({ email: user.email });
    const profilePicture = freshUser?.profilePicture;

    // Attempt to find the existing leaderboard entry
    let entry = await Leaderboard.findOne({ userName });

    // If it doesn't exist, handle defaults
    if (!entry) {
      entry = new Leaderboard({
        userName,
        profilePicture: profilePicture || undefined,
        totalScore: 0,
        quizzesTaken: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        rank: 0 // Will be recalculated dynamically later
      });
    } else {
      // Update profile picture even if entry exists
      if (profilePicture) {
        entry.profilePicture = profilePicture;
      }
    }

    // Update stats based on payload
    entry.totalScore += Number(score);
    entry.quizzesTaken += 1;
    entry.correctAnswers += Number(score);
    entry.wrongAnswers += (Number(totalQuestions) - Number(score));

    const savedEntry = await entry.save();
    res.status(200).json(savedEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Fetch specific user's stats and their dynamic rank
export const getUserStats = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized. Please login." });
    }

    const userName = user.userName;

    // Get all entries sorted by score to calculate rank
    const leaderboardEntries = await Leaderboard.find().sort({ totalScore: -1 });
    
    // Find the entry for the current user
    const userIndex = leaderboardEntries.findIndex(entry => entry.userName === userName);
    
    if (userIndex === -1) {
      // If no entry exists yet, return default zeroed stats
      return res.status(200).json({
        userName,
        totalScore: 0,
        quizzesTaken: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        rank: leaderboardEntries.length + 1
      });
    }

    const userEntry = leaderboardEntries[userIndex];
    
    res.status(200).json({
      _id: userEntry._id,
      userName: userEntry.userName,
      profilePicture: userEntry.profilePicture,
      totalScore: userEntry.totalScore,
      quizzesTaken: userEntry.quizzesTaken,
      correctAnswers: userEntry.correctAnswers,
      wrongAnswers: userEntry.wrongAnswers,
      rank: userIndex + 1
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

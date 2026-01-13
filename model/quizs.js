import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: [
      {
        type: String,
        required: true,
      },
    ],
    correctAnswer: {
      type: String,
      required: true,
    },
    questionType: {
      type: String,
      enum: ["MCQ", "TRUE_FALSE"],
      default: "MCQ",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Quiz", quizSchema);

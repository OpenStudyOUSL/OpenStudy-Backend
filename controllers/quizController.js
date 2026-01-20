import Quiz from "../model/quizs.js";

export const createQuiz = async (req, res) => {
  try {
    const {
      courseId,
      topic,
      question,
      options,
      correctAnswer,
      questionType,
    } = req.body;

    // Basic validation
    if (!options || options.length < 2) {
      return res
        .status(400)
        .json({ message: "At least two options are required" });
    }

    const quiz = new Quiz({
      courseId,
      topic,
      question,
      options,
      correctAnswer,
      questionType,
    });

    const savedQuiz = await quiz.save();
    res.status(201).json(savedQuiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate(
      "courseId",
      "courseName courseTutor"
    );
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getQuizzesByCourse = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ courseId: req.params.courseId });
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getQuizzesByTopic = async (req, res) => {
  try {
    const quizzes = await Quiz.find({
      courseId: req.params.courseId,
      topic: req.params.topic,
    });
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateQuiz = async (req, res) => {
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json(updatedQuiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteQuiz = async (req, res) => {
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);

    if (!deletedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export async function getQuizCount(req, res) {
  try {
    const count = await Quiz.countDocuments({});
    res.json({ count });
  } catch (e) {
    res.status(500).json({ message: "Error fetching quiz count" });
  }
}

export async function getQuizCountByCourse(req, res) {
  try {
    const courseId = req.params.courseId;
    const count = await Quiz.countDocuments({ courseId });
    res.json({ count });
  } catch (e) {
    res.status(500).json({ message: "Error fetching quiz count for course" });
  }
}
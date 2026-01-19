import Quiz from "../model/quizs.js";

/**
 * @desc    Create a new quiz question
 * @route   POST /api/quizzes
 */
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

/**
 * @desc    Get all quizzes
 * @route   GET /api/quizzes
 */
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

/**
 * @desc    Get quizzes by course
 * @route   GET /api/quizzes/course/:courseId
 */
export const getQuizzesByCourse = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ courseId: req.params.courseId });
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get quizzes by course & topic
 * @route   GET /api/quizzes/course/:courseId/topic/:topic
 */
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

/**
 * @desc    Update quiz question
 * @route   PUT /api/quizzes/:id
 */
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

/**
 * @desc    Delete quiz
 * @route   DELETE /api/quizzes/:id
 */
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

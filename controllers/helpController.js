import Topic from "../model/Help.js";

export const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find().sort({ createdAt: -1 });
    res.json(topics);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch topics" });
  }
};

export const createTopic = async (req, res) => {
  try {
    const { author, topic, description } = req.body;
    if (!author || !topic) {
      return res.status(400).json({ error: "Author and topic are required" });
    }

    const newTopic = new Topic({
      author,
      topic,
      description,
    });

    const savedTopic = await newTopic.save();
    res.status(201).json(savedTopic);
  } catch (error) {
    res.status(500).json({ error: "Failed to create topic" });
  }
};

export const deleteTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTopic = await Topic.findByIdAndDelete(id);
    if (!deletedTopic) {
      return res.status(404).json({ error: "Topic not found" });
    }
    res.json({ message: "Topic deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete topic" });
  }
};

export const addReply = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, author = "Anonymous" } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Reply text is required" });
    }

    const topic = await Topic.findById(id);
    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }

    topic.replies.push({ text, author });
    const updatedTopic = await topic.save();

    res.status(201).json(updatedTopic);
  } catch (error) {
    res.status(500).json({ error: "Failed to add reply" });
  }
};

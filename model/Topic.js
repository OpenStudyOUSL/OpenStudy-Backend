import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
      default: "Anonymous",
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const topicSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    replies: [replySchema],
  },
  { timestamps: true }
);

const Topic = mongoose.model("Topic", topicSchema);
export default Topic;

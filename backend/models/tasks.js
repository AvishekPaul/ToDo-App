const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//creating task schema
const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: false,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

//creating model from task schema
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

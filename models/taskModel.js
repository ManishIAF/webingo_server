// models/Task.js
import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxlength: [200, "Title cannot exceed 200 characters"],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, "Description cannot exceed 1000 characters"],
    default: "",
  },
  status: {
    type: String,
    enum: {
      values: ["Todo", "In Progress", "Completed"],
      message: "Status must be one of: Todo, In Progress, Completed",
    },
    default: "Todo",
  },
  priority: {
    type: String,
    enum: {
      values: ["Low", "Medium", "High"],
      message: "Priority must be one of: Low, Medium, High",
    },
    default: "Medium",
  },
  dueDate: {
    type: Date,
    default: null,
  }
}, {
  timestamps: true // createdAt and updatedAt are auto-managed by mongoose
});

// Optional: index to help queries by status/priority/dueDate
taskSchema.index({ status: 1, priority: -1, dueDate: 1 });

const Task = model("Task", taskSchema);
export default Task;

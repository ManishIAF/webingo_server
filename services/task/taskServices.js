import Task from "../../models/taskModel.js";

import AppError from "../../utilities/AppError.js";

// get all tasks for a user

const getAllTasks = async (userId, filters = {}) => {
    try {
      const { status, priority, search } = filters;
  
      let query = { userId };
  
      // Filter by status
      if (status) {
        query.status = status;   // Todo | In Progress | Completed
      }
  
      // Filter by priority
      if (priority) {
        query.priority = priority;  // Low | Medium | High
      }
  
      // Search by title (case-insensitive)
      if (search) {
        query.title = { $regex: search, $options: "i" };
      }
  
      const tasks = await Task.find(query).sort({ createdAt: -1 });
  
      return tasks;
    } catch (error) {
      throw new AppError(error.message || "Error while fetching tasks", 500);
    }
  };
  

const createTask = async (taskData) => {
    try {
        const task = new Task(taskData);
        await task.save();
        return task;
    } catch (error) {
        throw new AppError(error.message || "Error while creating task", 500);
    }
}

const getTasksByUserId = async (userId) => {
    try {
        const tasks = await Task.find({ userId });
        return tasks;
    } catch (error) {
        throw new AppError(error.message || "Error while fetching tasks", 500);
    }
}

const deleteTaskById = async (userId,taskId) => {
    try {
      
      const task = await Task.findOneAndDelete({ _id: taskId, userId });

      if (!task) {
        throw new AppError("Task not found or unauthorized", 404);
      }
      return task;

    } catch (error) {
        throw new AppError(error.message || "Error while deleting task", 500);
    }
}


export { getAllTasks, createTask, getTasksByUserId,deleteTaskById };
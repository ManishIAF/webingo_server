import { getAllTasks,createTask,getTasksByUserId, deleteTaskById } from "../services/task/taskServices.js";

const getAllTasksController = async (req, res, next) => {
    try {
      const {user_id} = req.user;
      console.log('querty',req.query);
      const { status, priority, search } = req.query; 

      console.log("Filters received:", { status, priority, search });
  
      const tasks = await getAllTasks(user_id, {
        status,
        priority,
        search
      });
  
      res.status(200).json({
        success: true,
        count: tasks.length,
        tasks
      });
    } catch (error) {
      next(error);
    }
};

const createTaskController = async (req, res, next) => {
    try {
      const {user_id} = req.user;
      const { title, description, status, priority, dueDate } = req.body;
  
      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: "Title and Description are required"
        });
      }
  
      const taskData = {
        userId:user_id,
        title,
        description,
        status: status || "Todo",
        priority: priority || "Medium",
        dueDate
      };
  
      const newTask = await createTask(taskData);
  
      res.status(201).json({
        success: true,
        task: newTask
      });
    } catch (error) {
      next(error);
    }
};

const getTasksByUserIdController = async (req, res, next) => {
    try {
      const userId = req.user._id;
  
      const tasks = await getTasksByUserId(userId);
  
      res.status(200).json({
        success: true,
        count: tasks.length,
        tasks
      });
    } catch (error) {
      next(error);
    }
}

const deleteTaskByIdController = async (req, res, next) => {
    try {

      const { user_id } = req.user;
      const { id } = req.params;

      console.log('params received:', req.params);
      console.log('Deleting task with ID:', id, 'for user ID:', user_id);
  
      const deletedTask = await deleteTaskById(user_id, id);
      console.log('Deleted Task:', deletedTask);
      if (!deletedTask) {
        return res.status(404).json({
          success: false,
          message: "Task not found or you don't have permission to delete it"
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Task deleted successfully"
      });
    } catch (error) {
      next(error);
    }
};


export { getAllTasksController, createTaskController, getTasksByUserIdController,deleteTaskByIdController };
  
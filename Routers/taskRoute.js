import { Router } from "express";

const router = Router();

import { getAllTasksController,createTaskController, getTasksByUserIdController,deleteTaskByIdController,updateTaskByIdController } from "../controllers/taskController.js";
import { isAuthentic } from "../middlewares/isAuthentic.js";

router.route('/').get(isAuthentic,getAllTasksController).post(isAuthentic,createTaskController);
router.route('/:id').get(isAuthentic,getTasksByUserIdController).patch(isAuthentic,updateTaskByIdController).delete(isAuthentic,deleteTaskByIdController);

export default router;
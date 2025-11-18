import { Router } from "express";

const router = Router();

import { getAllTasksController,createTaskController, getTasksByUserIdController,deleteTaskByIdController } from "../controllers/taskController.js";
import { isAuthentic } from "../middlewares/isAuthentic.js";

router.route('/').get(isAuthentic,getAllTasksController).post(isAuthentic,createTaskController);
router.route('/:id').get(isAuthentic,getTasksByUserIdController).delete(isAuthentic,deleteTaskByIdController);

export default router;
import { Router } from "express";

const router = Router();

import { isAuthentic } from "../middlewares/isAuthentic.js";
import { Authenticate, refreshAccessToken } from "../controllers/AuthenticateController.js";

router.route('/authenticate').get(isAuthentic,Authenticate)
router.route('/refresh-access-token').get(refreshAccessToken)

export default router;
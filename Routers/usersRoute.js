import { Router } from "express";

const router = Router();

import { Login,Signup, logout/*, verifyUserAccount*/ } from "../controllers/usersController.js";

router.route('/login').post(Login);
router.route('/signup').post(Signup);
router.route('/logout').post(logout);
//router.route('/verify-user-account').post(verifyUserAccount);

export default router;
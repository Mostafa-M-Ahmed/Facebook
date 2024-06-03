import { Router } from "express";
import * as userController from "./user.controller.js";
import { authenticateToken } from '../../../Middleware/auth.js';
const router = Router();


router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.post('/logout', authenticateToken, userController.logoutUser)
router.get('/posts', userController.getAuthorPosts)
router.get('/post_comments', userController.getUserPostAllComments)




export default router

import { Router } from "express";
import * as userController from "./user.controller.js";
const router = Router();


router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.post('/logout', userController.logoutUser)
router.get('/posts', userController.getAuthorPosts)
router.get('/post_comments', userController.getUserPostAllComments)




export default router

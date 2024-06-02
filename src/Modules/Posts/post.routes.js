import { Router } from "express";
import * as postController from "./post.controller.js";
import { authenticateToken } from '../../../Middleware/auth.js';
const router = Router();

router.post('/create', authenticateToken, postController.addPost)
router.get('/list_all', postController.listPosts)
router.get('/list/:id', postController.listSpecificPost)
router.put('/update/:id', authenticateToken, postController.updatePost)
router.delete('/delete/:id', authenticateToken, postController.deletePost)
router.get('/author', postController.getPostWithAuthor);
router.get('/comments', postController.getPostWithComments)


export default router
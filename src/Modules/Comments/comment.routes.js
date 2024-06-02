import { Router } from "express";
import * as commentController from "./comment.controller.js";
import { authenticateToken } from '../../../Middleware/auth.js';
const router = Router();

router.post('/create', authenticateToken, commentController.addComment)
router.get('/list_all', commentController.listComments)
router.get('/list/:id', commentController.listSpecificComment)
router.put('/update/:id', authenticateToken, commentController.updateComment)
router.delete('/delete/:id', authenticateToken, commentController.deleteComment)


export default router
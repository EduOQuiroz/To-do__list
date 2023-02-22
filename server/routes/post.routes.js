import { Router } from "express";
const router = Router();
import {getPosts, createPosts, getPost, updatePost, deletePost} from '../controllers/posts.controllers.js'

router.get('/posts', getPosts )
router.post('/posts', createPosts)
router.get('/posts/:id', getPost)
router.patch('/posts/:id', updatePost)
router.delete('/posts/:id', deletePost)


export default router;


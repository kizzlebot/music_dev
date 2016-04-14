import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
import PostRouter from './post.routes';
import UserRouter from './user.routes';

const router = new Router();



router.use('/posts', PostRouter);
router.use('/users', UserRouter);

// router.route('/posts/getPosts').get(PostController.getPosts);

// // Get one post by title
// router.route('/posts/getPost').get(PostController.getPost);

// // Add a new Post
// router.route('/posts/addPost').post(PostController.addPost);

// // Delete a Post
// router.route('/posts/deletePost').post(PostController.deletePost);


export default router;

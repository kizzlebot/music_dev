import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
import PostRouter from './post.routes';
import UserRouter from './user.routes';

const router = new Router();



router.use('/posts', PostRouter);
router.use('/users', UserRouter);



export default router;

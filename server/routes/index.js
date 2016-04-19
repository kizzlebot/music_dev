import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
import PostRouter from './post.routes';
import AuthRouter from './auth.routes';

const router = new Router();



router.use('/posts', PostRouter);
router.use('/users', AuthRouter);



export default router;

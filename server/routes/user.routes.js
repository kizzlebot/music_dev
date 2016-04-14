import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

// Get all Posts
router.get('/', UserController.getUser);
router.post('/', UserController.postUser);




export default router;

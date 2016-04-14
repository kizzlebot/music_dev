import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

// Get all Posts
router.get('/', UserController.getUsers);
router.post('/register', UserController.register);
router.post('/authenticate', UserController.authenticate);






export default router;

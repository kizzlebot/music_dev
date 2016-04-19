import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';
const router = new Router();

// Get all Posts
router.get('/', AuthController.getUsers);
router.post('/register', AuthController.register);
router.post('/login', AuthController.authenticate);






export default router;

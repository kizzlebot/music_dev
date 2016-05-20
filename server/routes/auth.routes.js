import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';
const router = new Router();

// Get all Posts
router.get('/', AuthController.getUsers);
router.use('/check', AuthController.isAuthenticated, function(req, res, next){
  if(req.decoded){
    res.json({
      success:true,
      message:'Token is valid'
    })
  }
});

router.post('/register', AuthController.register);
router.post('/login', AuthController.authenticate);


router.get('/spotify', AuthController.spotifyCodeCallback);
router.get('/callback/spotify', AuthController.spotifyCodeCallback);






export default router;

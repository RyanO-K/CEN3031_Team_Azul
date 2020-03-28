import express from 'express';
import * as horoscopeOperations from '../controllers/userController.js';
    
var userRouter = express.Router();

userRouter.post('/horoscopeInfo/',horoscopeOperations.create);
userRouter.get('/horoscopeInfo/',horoscopeOperations.list);
userRouter.get('/horoscopeInfo/:horoscopeID',horoscopeOperations.read);
userRouter.put('/horoscopeInfo/:horoscopeID',horoscopeOperations.update);
userRouter.delete('/horoscopeInfo/:horoscopeID',horoscopeOperations.remove);
  
export default userRouter;
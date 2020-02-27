import express from 'express';
import * as horoscopeOperations from '../controllers/userController.js';
    
var userRouter = express.Router();

userRouter.post('/:horoscopeID',horoscopeOperations.create);
userRouter.get('/',horoscopeOperations.list);
userRouter.get('/:horoscopeID',horoscopeOperations.read);
userRouter.put('/:horoscopeID',horoscopeOperations.update);
userRouter.delete('/:horoscopeID',horoscopeOperations.remove);
  
export default userRouter;
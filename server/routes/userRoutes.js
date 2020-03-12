var express = require('express');
var horoscopeOperations = require('../controllers/userController.js');
    
var userRouter = express.Router();

userRouter.post('/',horoscopeOperations.create);
userRouter.get('/',horoscopeOperations.list);
userRouter.get('/:horoscopeID',horoscopeOperations.read);
userRouter.put('/:horoscopeID',horoscopeOperations.update);
userRouter.delete('/:horoscopeID',horoscopeOperations.remove);
  
module.exports = userRouter;
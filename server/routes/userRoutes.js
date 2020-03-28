var express = require('express');
var horoscopeOperations = require('../controllers/userController.js');
    
var userRouter = express.Router();

userRouter.post('/horoscopeInfo/',horoscopeOperations.create);
userRouter.get('/horoscopeInfo/',horoscopeOperations.list);
userRouter.get('/horoscopeInfo/:horoscopeID',horoscopeOperations.read);
userRouter.put('/horoscopeInfo/:horoscopeID',horoscopeOperations.update);
userRouter.delete('/horoscopeInfo/:horoscopeID',horoscopeOperations.remove);
  
module.exports = userRouter;
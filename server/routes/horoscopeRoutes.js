var express = require('express');
var horoscopeOperations = require('../controllers/horoscopeController.js');
    
var horoscopeRouter = express.Router();

horoscopeRouter.post('/horoscopeInfo/',horoscopeOperations.create);
horoscopeRouter.get('/horoscopeInfo/',horoscopeOperations.list);
horoscopeRouter.get('/horoscopeInfo/:horoscopeID',horoscopeOperations.read);
horoscopeRouter.put('/horoscopeInfo/:horoscopeID',horoscopeOperations.update);
horoscopeRouter.delete('/horoscopeInfo/:horoscopeID',horoscopeOperations.remove);
  
module.exports = horoscopeRouter;
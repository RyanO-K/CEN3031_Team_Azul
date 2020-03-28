var express = require('express');
var horoscopeOperations = require('../controllers/horoscopeController.js');
var personalInformationOperations = require( '../controllers/personalInformationController.js');

var horoscopeRouter = express.Router();

horoscopeRouter.post('/horoscopeInfo/',horoscopeOperations.create);
horoscopeRouter.get('/horoscopeInfo/',horoscopeOperations.list);
horoscopeRouter.get('/horoscopeInfo/:horoscopeID',horoscopeOperations.read);
horoscopeRouter.put('/horoscopeInfo/:horoscopeID',horoscopeOperations.update);
horoscopeRouter.delete('/horoscopeInfo/:horoscopeID',horoscopeOperations.remove);
horoscopeRouter.options('/*',horoscopeOperations.options);

horoscopeRouter.post('/personal/',personalInformationOperations.create);
horoscopeRouter.get('/personal/',personalInformationOperations.list);
horoscopeRouter.get('/personal/:Email',personalInformationOperations.read);
horoscopeRouter.put('/personal/:Email',personalInformationOperations.update);
horoscopeRouter.delete('/personal/:Email',personalInformationOperations.remove);
horoscopeRouter.options('/*',personalInformationOperations.options);

module.exports = horoscopeRouter;
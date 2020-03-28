var express = require('express');
var personalInformationOperations = require( '../controllers/personalInformationController.js');
    
var personalInformationRouter = express.Router();

personalInformationRouter.post('/',personalInformationOperations.create);
personalInformationRouter.get('/',personalInformationOperations.list);
personalInformationRouter.get('/:Email',personalInformationOperations.read);
personalInformationRouter.put('/:Email',personalInformationOperations.update);
personalInformationRouter.delete('/:Email',personalInformationOperations.remove);

module.exports = personalInformationRouter;
import express from 'express';
import examples from '../controllers/examples.server.controller.js';
    
var router = express.Router();
router.route('/')
  .get(examples);
  
export default router;
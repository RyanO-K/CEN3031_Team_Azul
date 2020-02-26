import uri from './config.js';
import mongoose from 'mongoose';
import * as http from 'http';
import * as fs from 'fs';



var connection = mongoose.connect(String(uri.db.uri),{useNewUrlParser: true,useUnifiedTopology: true});
var db = mongoose.connection;
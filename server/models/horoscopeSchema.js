var mongoose = require('mongoose');



const horoscopeData = new mongoose.Schema({

  house: {type: String, required:true},
  sign: {type: String, required:true},
  moonphase: {type: String,required:true},
  description: String
});


const horoscopeSchema = mongoose.model('Horoscope', horoscopeData);
module.export = horoscopeSchema;

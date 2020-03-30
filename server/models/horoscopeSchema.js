var mongoose = require('mongoose');



const horoscopeData = new mongoose.Schema({

  house: {type: String, required:true},
  sign: {type: String, required:true},
  moonphase: {type: String,required:true},
  description: String
  },{
    collection : 'Heavan'
  }
  );


const horoscopeModel = mongoose.model('Horoscope', horoscopeData);
module.exports = horoscopeModel;
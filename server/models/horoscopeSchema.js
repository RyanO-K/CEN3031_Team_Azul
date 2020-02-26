import mongoose from 'mongoose';



const horoscopeData = new mongoose.Schema({

  house: {type: String, required:true},
  sign: {type: String, required:true},
  moonphase: {type: String,required:true},
  description: String
});


var horoscopeSchema = mongoose.model('Horoscope', horoscopeSchema);
export default horoscopeSchema;

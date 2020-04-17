
var mongoose = require('mongoose');



const personalInformationData = new mongoose.Schema({

  Name: {type: String, required:true},
  Sign: {type: String,required:true},
  Birthday:{type: String},
  TimeOfBirth:{type: String},
  LocationOfBirth:{type: String,required:true},
  Email:{type:String,required:true,unique:true},
  House:{type:String}
  },{
    collection: 'Users'
  });


var personalInformationSchema = mongoose.model('Person', personalInformationData);
module.exports = personalInformationSchema;

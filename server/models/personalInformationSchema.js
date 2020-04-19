
var mongoose = require('mongoose');



const personalInformationData = new mongoose.Schema({

  Name: {type: String, required:true},
  Sign: {type: String,required:true},
  Birthday:{type: String, required:true},
  TimeOfBirth:{type: String},
  LocationOfBirth:{type: String},
  Email:{type:String,required:true,unique:true},
  House:{type:String},
  Subscribed:{type:Boolean}
  },{
    collection: 'Users'
  });


var personalInformationSchema = mongoose.model('Person', personalInformationData);
module.exports = personalInformationSchema;

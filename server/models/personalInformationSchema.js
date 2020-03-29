
var mongoose = require('mongoose');



const personalInformationData = new mongoose.Schema({

  Name: {type: String, required:true},
  Sign: {type: String,required:true},
  Birthday:{type: String},
  LocationOfBirth:{type: String,required:true},
  Email:{type:String,required:true,unique:true},
  Password:{type:String,required:true}
  },{
    collection: 'Users'
  });


var personalInformationSchema = mongoose.model('Person', personalInformationData);
module.exports = personalInformationSchema;
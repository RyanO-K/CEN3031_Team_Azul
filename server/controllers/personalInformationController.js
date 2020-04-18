var swisseph=require('swisseph');
//var UserProfile=require('../../client/src/views/SignUp/UserState');

//personalInformationCombo is the object we will create when making a new entry
var personalInformationCombo = require( '../models/personalInformationSchema.js');
//var axiosRequests=require('../../client/src/axiosRequests');

var nodemailer = require('nodemailer');



//create a horoscope combo
const create = async (req, res) => {

    let house='';
    console.log(req);
    if(req.body.LocationOfBirth!==undefined && req.body.TimeOfBirth!==undefined && req.body.TimeOfBirth.length>0 && req.body.LocationOfBirth.length>0){
    var arr=req.body.Birthday.split('-');
    var arr2=req.body.TimeOfBirth.split(':');
    console.log('10');
    var julday= swisseph.swe_julday(parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]), parseInt(arr2[0]), swisseph.SE_GREG_CAL )
    console.log(julday);
    console.log('30');
    swisseph.swe_houses(julday, 30, -82, 'C', function(houses){
     console.log(houses);   
     house=houses.house[0];
    });
    console.log('40');
   }
    
    req.body.House=house;
    console.log(req.body);

    const person = new personalInformationCombo(req.body);

console.log(person);

    person.save().then(data => {
        res.header('Access-Control-Allow-Origin', '*');
        res.status(200).send(person);
    }).catch(err => {
        if(err.code == 11000){
            res.header('Access-Control-Allow-Origin', '*');
            res.status(409).send({
                message: err.message || "Duplication error"
            });
        }
        res.header('Access-Control-Allow-Origin', '*');
        console.log(person);
        res.status(500).send({
            message: err.message || "Error on create"
        });
    });



    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'jimmyderobotics@gmail.com',
          pass: 'm00nfl0w'
        }
      });
      
      var mailOptions = {
        from: 'jimmyderobotics@gmail.com',
        to: req.body.Email,
        subject: 'Welcome to Moonflow',
        text: 'Hello '+req.body.Name+' you have now signed up for moonflow'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      console.log("hi");

};

//show a horoscope listing
const read = async (req, res) => {

console.log(req.url);


    if(req.url==='/personal/Admin@admin.com2'){
    console.log('fail');
    console.log(list());
      let response=await personalInformationCombo.find();
       console.log(response);
      for(let i=0; i<response.length; i++){
        let em=response[i].Email;
        console.log('fail');
  
  
        
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'jimmyderobotics@gmail.com',
          pass: 'm00nfl0w'
        }
      });
      
      var mailOptions = {
        from: 'jimmyderobotics@gmail.com',
        to: em,
        subject: 'Your Moon Change Update',
        text: 'Hello '+response[i].Name+' your update is:\nHouse: '+response[i].House+'\nSign:'+response[i].Sign
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      console.log("hi");
      }

  }


else{

    //TODO
    
    personalInformationCombo.findOne({ 'Email': req.params.Email}).then(data =>{
        if(data!=null){
            res.header('Access-Control-Allow-Origin', '*');
            res.status(200).json(data);
        }else{
            res.header('Access-Control-Allow-Origin', '*');
            res.status(404).send({error: 'Doc not found: ' + req.params.Email});
        }
    }).catch(err => {
        res.header('Access-Control-Allow-Origin', '*');
        res.status(500).send({
            message: err.message || "Read failed: " + req.params.Email
        })
    });


}
};

//update a horoscope listing
const update = async (req, res) => {
    //TODO: Birthday is currently uneditable




    let house='';
    console.log(req);
    if(req.body.LocationOfBirth!==undefined && req.body.TimeOfBirth!==undefined && req.body.TimeOfBirth.length>0 && req.body.LocationOfBirth.length>0){
    var arr=req.body.Birthday.split('-');
    var arr2=req.body.TimeOfBirth.split(':');
    console.log('10');
    var julday= swisseph.swe_julday(parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]), parseInt(arr2[0]), swisseph.SE_GREG_CAL )
    console.log(julday);
    console.log('30');
    swisseph.swe_houses(julday, 30, -82, 'C', function(houses){
     console.log(houses);   
     house=houses.house[0];
    });
    console.log('40');
   }
    
    req.body.House=house;
    console.log(req.body);



    const person = new personalInformationCombo(req.body);
    personalInformationCombo.findOneAndUpdate({ 'Email': req.params.Email},{
                                            Name:req.body.Name || Name,
                                            Sign:req.body.Sign || Sign,
                                            LocationOfBirth:req.body.LocationOfBirth || LocationOfBirth,
                                            Email:req.body.Email || Email,
                                            Birthday:req.body.Birthday || Birthday,
                                            TimeOfBirth:req.body.TimeOfBirth||TimeOfBirth,
                                            House:req.body.House||House,
                                            Subscribed:req.body.Subscribed

                                            }).then(data =>{
        
            personalInformationCombo.findOne({ 'Email': req.params.Email}).then(data=>{
            
            if(data!=null){
                res.header('Access-Control-Allow-Origin', '*');
                res.status(200).json(data);
            }else{
                res.header('Access-Control-Allow-Origin', '*');
                res.status(404).send({error: 'Person updated, but lost ' + req.params.Email});
            }

        }).catch(err => {
            res.header('Access-Control-Allow-Origin', '*');
            res.status(500).send({
                message: err.message || "Saved Person not found: " + req.params.Email
            })
        });

    }).catch(err => {
        res.header('Access-Control-Allow-Origin', '*');
        res.status(404).send({
            message: err.message || "Doc update failed: " + req.params.Email
        })
    });
};

//remove a horoscopeCombo
const remove = async (req, res) => {
    //TODO
    personalInformationCombo.findOneAndDelete({ '_id': req.params.Email}).then(data =>{
        if(data != null){
            res.header('Access-Control-Allow-Origin', '*');
            res.status(200).send(data);
        }else{
            res.header('Access-Control-Allow-Origin', '*');
             res.status(404).send({error: 'Doc not found: '+req.params.Email});
        }
    }).catch(err => {
        res.header('Access-Control-Allow-Origin', '*');
        res.status(500).send({
            message: err.message|| "Remove failed: " + req.params.Email

        });
    });
};

//list a horoscopeCombo
const list = async (req, res) => {
    //TODO

    personalInformationCombo.find().sort().then(data =>{
        res.header('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);
    }).catch(err => {
        res.header('Access-Control-Allow-Origin', '*');
        res.status(500).send({
            
            message: err.message||"List failed"
        });
    });
};

const options = async (req, res) => {

    var corsOptions = {
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
      }
    res.header('Access-Control-Allow-Origin', '*');

}

module.exports = {
    list,
    remove,
    update,
    read,
    create,
    options
};

var swisseph=require('swisseph');
//var UserProfile=require('../../client/src/views/SignUp/UserState');
var horoscopeModel = require('../models/horoscopeSchema.js');

//personalInformationCombo is the object we will create when making a new entry
var personalInformationCombo = require( '../models/personalInformationSchema.js');
//var axiosRequests=require('../../client/src/axiosRequests');

var nodemailer = require('nodemailer');

var axios = require('axios');


//create a horoscope combo
const create = async (req, res) => {
    if(req.headers.authorization == (process.env.key||'Bearer 2h589hg9unfd0sfyg72458ugn540983g')){

    let lat ='';
    let long = '';
    let location = '';
    location = req.body.LocationOfBirth;
    //console.log(location)
    await axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
        params:{
            address: location,
            key: 'AIzaSyCebNZEhXnVyKoMr_YRqjkgj1o2HQF8pE0'
        }
    })
    .then(function(response){
         console.log(response.data.results[0])
         lat = response.data.results[0].geometry.location.lat;
         long = response.data.results[0].geometry.location.lng;
         //console.log(lat)
     })
     .catch(function(error){
         lat = 29.6516;
         long = 82.3248;
     });
     //console.log(lat)
    let house='1st';
    let sign='Aries'
    let ascendant=0.0;
    //console.log(req);
    if(req.body.TimeOfBirth == ''){
        var arr=req.body.Birthday.split('-');
        let month = arr[1];
        let day = arr[2];
        if(month == 3){
            if(day >= 21){
                req.body.Sign = "Aries"
                req.body.House = "1st"
            }
            else{
                req.body.Sign = "Pisces"
                req.body.House = "12th"
            }
        }
        else if(month == 4){
            if(day <= 19){
                req.body.Sign = "Aries"
                req.body.House = "1st"
            }
            else{
                req.body.Sign = "Taurus"
                req.body.House = "2nd"
            }
        }
        else if(month == 5){
            if(day <= 20){
                req.body.Sign = "Taurus"
                req.body.House = "2nd"
            }
            else{
                req.body.Sign = "Gemini"
                req.body.House = "3rd"
            }
        }
        else if(month == 6){
            if(day <= 20){
                req.body.Sign = "Gemini"
                req.body.House = "3rd"
            }
            else{
                req.body.Sign = "Cancer"
                req.body.House = "4th"
            }
        }
        else if(month == 7){
            if(day <= 22){
                req.body.Sign = "Cancer"
                req.body.House = "4th"
            }
            else{
                req.body.Sign = "Leo"
                req.body.House = "5th"
            }
        }
        else if(month == 8){
            if(day <= 22){
                req.body.Sign = "Leo"
                req.body.House = "5th"
            }
            else{
                req.body.Sign = "Virgo"
                req.body.House = "6th"
            }
        }
        else if(month == 9){
            if(day <= 22){
                req.body.Sign = "Virgo"
                req.body.House = "6th"
            }
            else{
                req.body.Sign = "Libra"
                req.body.House = "7th"
            }
        }
        else if(month == 10){
            if(day <= 22){
                req.body.Sign = "Libra"
                req.body.House = "7th"
            }
            else{
                req.body.Sign = "Scorpio"
                req.body.House = "8th"
            }
        }
        else if(month == 11){
            if(day <= 21){
                req.body.Sign = "Scorpio"
                req.body.House = "8th"
            }
            else{
                req.body.Sign = "Sagittarius"
                req.body.House = "9th"
            }
        }
        else if(month == 12){
            if(day <= 21){
                req.body.Sign = "Sagittarius"
                req.body.House = "9th"
            }
            else{
                req.body.Sign = "Capricorn"
                req.body.House = "10th"
            }
        }
        else if(month == 1){
            if(day <= 19){
                req.body.Sign = "Capricorn"
                req.body.House = "10th"
            }
            else{
                req.body.Sign = "Aquarius"
                req.body.House = "11th"
            }
        }
        else if(month == 2){
            if(day <= 18){
                req.body.Sign = "Aquarius"
                req.body.House = "11th"
            }
            else{
                req.body.Sign = "Pisces"
                req.body.House = "12th"
            }
        }
        else{
            req.body.Sign = "Unable to Calculate"
            req.body.House = "1st"
        }
        
   }
    if(req.body.LocationOfBirth!==undefined && req.body.TimeOfBirth!==undefined && req.body.TimeOfBirth.length>0 && req.body.LocationOfBirth.length>0){
    var arr=req.body.Birthday.split('-');
    var arr2=req.body.TimeOfBirth.split(':');
    var julday= swisseph.swe_julday(parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]), parseInt(arr2[0]), swisseph.SE_GREG_CAL )
    //console.log(julday);
    console.log('30');
    swisseph.swe_houses(julday, parseFloat(lat), parseFloat(long), 'W', function(houses){
     console.log(houses);   
     ascendant=houses.ascendant;
    });
    let num = Math.round(ascendant/30);
    if(num == 1){
        req.body.Sign = 'Aries';
        req.body.House = '1st';
    }
    else if(num == 2){
        req.body.Sign = 'Taurus';
        req.body.House = '2nd';
    }
    else if(num == 3){
        req.body.Sign = 'Gemini';
        req.body.House = '3rd';
    }
    else if(num == 4){
        req.body.Sign = 'Cancer';
        req.body.House = '4th';
    }
    else if(num == 5){
        req.body.Sign = 'Leo';
        req.body.House = '5th';
    }
    else if(num == 6){
        req.body.Sign = 'Virgo';
        req.body.House = '6th';
    }
    else if(num == 7){
        req.body.Sign = 'Libra';
        req.body.House = '7th';
    }
    else if(num == 8){
        req.body.Sign = 'Scorpio';
        req.body.House = '8th';
    }
    else if(num == 9){
        req.body.Sign = 'Sagittarius';
        req.body.House = '9th';
    }
    else if(num == 10){
        req.body.Sign = 'Capricorn';
        req.body.House = '10th';
    }
    else if(num == 11){
        req.body.Sign = 'Aquarius';
        req.body.House = '11th';
    }
    else if(num == 12){
        req.body.Sign = 'Pisces';
        req.body.House = '12th';
    }
    
    console.log('40');
   }

    console.log(req.body);

    const person = new personalInformationCombo(req.body);

    console.log(person);

    person.save().then(data => {
        res.header('Access-Control-Allow-Origin', '*');
        res.status(200).send(person);

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
            }
          });
          
          var mailOptions = {
            from: process.env.EMAIL,
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
          
    }).catch(err => {
        if(err.code == 11000){
            res.header('Access-Control-Allow-Origin', '*');
            res.status(409).send({
                message: err.message || "Duplication error"
            });
            return;
        }
        res.header('Access-Control-Allow-Origin', '*');
        
        res.status(500).send({
            message: err.message || "Error on create"
        });
    });
}else{
        res.status(401).send({
            message: "Auth Failed"
        })
    }
    

};

//show a horoscope listing
const read = async (req, res) => {
    if(req.headers.authorization == (process.env.key||'Bearer 2h589hg9unfd0sfyg72458ugn540983g')){
        

            if(req.url.indexOf('/personal/Admin@admin.com2')===0){
            let moonphase=req.url.substring(26);

            
            let response=await personalInformationCombo.find();
            
            for(let i=0; i<response.length; i++){
                if(response[i].Subscribed!==undefined && response[i].House!==undefined)
                if(response[i].Subscribed){
                let em=response[i].Email;
                
        let b=null;
                horoscopeModel.findOne({ 'house': '1st', 'moonphase':moonphase,'sign':response[i].Sign}).then(data =>{
                    if(data!=null){
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                            user: process.env.EMAIL,
                            pass: process.env.PASSWORD
                            }
                        });
                        
                        var mailOptions = {
                            from: process.env.EMAIL,
                            to: em,
                            subject: 'Your Moon Change Update',
                            text: 'Hello '+response[i].Name+' your update is:\nHouse: '+response[i].House+'\nSign:'+response[i].Sign+'\n'+data.description
                        };
                        
                        transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                            console.log(error);
                            } else {
                            console.log('Email sent: ' + info.response);
                            }
                        });
                        
                        res.header('Access-Control-Allow-Origin', '*');
                        res.status(200).json(data);
                    }else{
                        //res.header('Access-Control-Allow-Origin', '*');
                    // res.status(404).send({error: 'Doc not found: ' + req.body.house + " " + req.body.moonphase});
                    }
                }).catch(err => {
                    
                    //res.header('Access-Control-Allow-Origin', '*');
                // res.status(500).send({
                    //   message: err.message || "Read failed: " + req.body.house + " " + req.body.moonphase
                    //})
                });
                

            
            }
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
    }else{
        res.status(401).send({
            message: "auth failed"
        })
    }


};

//update a horoscope listing
const update = async (req, res) => {
    //TODO: Birthday is currently uneditable


    if(req.headers.authorization == (process.env.key||'Bearer 2h589hg9unfd0sfyg72458ugn540983g')){

        let house='';
        
        if(req.body.LocationOfBirth!==undefined && req.body.TimeOfBirth!==undefined && req.body.TimeOfBirth.length>0 && req.body.LocationOfBirth.length>0){
        var arr=req.body.Birthday.split('-');
        var arr2=req.body.TimeOfBirth.split(':');
        
        var julday= swisseph.swe_julday(parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]), parseInt(arr2[0]), swisseph.SE_GREG_CAL )
        console.log(julday);
        
        swisseph.swe_houses(julday, 30, -82, 'C', function(houses){
           
        house=houses.house[0];
        });
        
    }
        
        req.body.House=house;


        const person = new personalInformationCombo(req.body);
        personalInformationCombo.findOneAndUpdate({ 'Email': req.params.Email},{
                                                Name:req.body.Name || Name,
                                                Sign:req.body.Sign || Sign,
                                                LocationOfBirth:req.body.LocationOfBirth,
                                                Email:req.body.Email || Email,
                                                Birthday:req.body.Birthday || Birthday,
                                                TimeOfBirth:req.body.TimeOfBirth,
                                                House:req.body.House,
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
    }else{
        res.status(401).send({
            message: "Auth Failed"
        })
    }
};

//remove a horoscopeCombo
const remove = async (req, res) => {
    //TODO
    if(req.headers.authorization == (process.env.key||'Bearer 2h589hg9unfd0sfyg72458ugn540983g')){    
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
    }else{
        res.status(401).send({
            message: "Auth Failed"
        })
    }
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
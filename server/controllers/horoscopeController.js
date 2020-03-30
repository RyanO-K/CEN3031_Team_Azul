//horoscopeModel is the object we will create when making a new entry
var horoscopeModel = require('../models/horoscopeSchema.js');
var cors = require('cors');

//create a horoscope combo
const create = async (req, res) => {
    const horoscope = new horoscopeModel(req.body);
    
    horoscope.save().then(data => {
        res.header('Access-Control-Allow-Origin', '*');
        res.status(200).send(horoscope);
    }).catch(err => {
        if(err.code == 11000){
            res.header('Access-Control-Allow-Origin', '*');
            res.status(409).send({
                message: err.message || "Duplication error"
            });
        }else{
            res.header('Access-Control-Allow-Origin', '*');
            res.status(500).send({
                message: err.message || "Error on create: " + req.body.sign + "." + req.body.house + "." + req.body.moonphase
            });
        }
    });

};

//show a horoscope listing
const read = async (req, res) => {
    horoscopeModel.findOne({ 'house': req.query.house, 'moonphase':req.query.moonphase,'sign':req.query.sign}).then(data =>{
        if(data!=null){
            res.header('Access-Control-Allow-Origin', '*');
            res.status(200).json(data);
        }else{
            res.header('Access-Control-Allow-Origin', '*');
            res.status(404).send({error: 'Doc not found: ' + req.body.house + " " + req.body.moonphase});
        }
    }).catch(err => {
        res.header('Access-Control-Allow-Origin', '*');
        res.status(500).send({
            message: err.message || "Read failed: " + req.body.house + " " + req.body.moonphase
        })
    });



};

//update a horoscope listing
const update = async (req, res) => {
  
  horoscopeModel.findOneAndUpdate({ 'house': req.query.house, 'moonphase':req.query.moonphase,'sign':req.query.sign},
    {
        house:req.body.house || house,
        sign: req.body.sign || sign,
        moonphase:req.body.moonphase || moonphase,
        description:req.body.description || description || ""

    }).then(data =>{
        horoscopeModel.findOne({ 'house': data.house, 'moonphase':data.moonphase,'sign':data.sign}).then(data=>{
            if(data!=null){
                res.header('Access-Control-Allow-Origin', '*');
                res.status(200).json(data);
            }else{
                console.log('Doc is lost');
                res.header('Access-Control-Allow-Origin', '*');
                res.status(404).send({error: 'Doc lost ' + req.query});
            }

        }).catch(err => {
            res.header('Access-Control-Allow-Origin', '*');
            res.status(500).send({
                message: err.message || "Saved Doc not found: " + req.query
            })
        });

    }).catch(err => {
        res.header('Access-Control-Allow-Origin', '*');
        res.status(404).send({
            message: err.message || "Doc update failed: " + req.query
        })
    });
};

//remove a horoscopeCombo
const remove = async (req, res) => {
    horoscopeModel.findOneAndDelete({ '_id': req.params.horoscopeID}).then(data =>{
        if(data != null){
            res.header('Access-Control-Allow-Origin', '*');
            res.status(200).send(data);
        }else{
            res.header('Access-Control-Allow-Origin', '*');
            res.status(404).send({error: 'Doc not found: '+req.params.horoscopeID});
        }
    }).catch(err => {
        res.header('Access-Control-Allow-Origin', '*');
        res.status(500).send({
            message: err.message || "Remove failed: " + req.params.horoscopeID

        });
    });
};

//list all horoscopeCombos
const list = async (req, res) => {
    //TODO
    console.log('listing')
    horoscopeModel.find().sort().then(data =>{
        res.header('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);
    }).catch(err => {
        console.log('failed')

        res.header('Access-Control-Allow-Origin', '*');
        res.status(500).send({
            message: err.message || "List failed"
        });
    });
};

const options = async (req, res) => {
    console.log('options')
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
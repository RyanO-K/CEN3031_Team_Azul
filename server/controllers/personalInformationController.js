//personalInformationCombo is the object we will create when making a new entry
var personalInformationCombo = require( '../models/personalInformationSchema.js');

//create a horoscope combo
const create = async (req, res) => {
    const person = new personalInformationCombo(req.body);

    
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
        res.status(500).send({
            message: err.message || "Error on create"
        });
    });

};

//show a horoscope listing
const read = async (req, res) => {
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



};

//update a horoscope listing
const update = async (req, res) => {
    //TODO: Birthday is currently uneditable

    const person = personalInformationCombo.findOne({ 'Email': req.params.Email});
    personalInformationCombo.findOneAndUpdate({ 'Email': req.params.Email},{
                                            Name:req.body.Name || Name,
                                            Sign:req.body.Sign || Sign,
                                            LocationOfBirth:req.body.LocationOfBirth || LocationOfBirth,
                                            Email:req.body.Email || Email,
                                            Birthday:req.body.Birthday || Birthday,
                                            TimeOfBirth:req.body.TimeOfBirth||TimeOfBirth
                                            //House:req.body.House||House,
                                            //acceptsEmail:req.body.acceptsEmail || person.acceptsEmails

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
    personalInformationCombo.findOneAndDelete({ 'Email': req.params.Email}).then(data =>{
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

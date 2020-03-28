//personalInformationCombo is the object we will create when making a new entry
var personalInformationCombo = require( '../models/personalInformationSchema.js');

//create a horoscope combo
const create = async (req, res) => {
    const person = new personalInformationCombo(req.body);

    
    person.save().then(data => {
        res.status(200).send(person);
    }).catch(err => {
        if(err.code == 11000){
            res.status(409).send({
                message: err.message || "Duplication error"
            });
        }
        res.status(500).send({
            message: err.message || "Error on create"
        });
    });

};

//show a horoscope listing
const read = async (req, res) => {
    //TODO
    personalInformationCombo.findOne({ '_id': req.params.Email}).then(data =>{
        if(data!=null){
            res.status(200).json(data);
        }else{
            res.status(404).send({error: 'Doc not found: ' + req.params.Email});
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Read failed: " + req.params.Email
        })
    });



};

//update a horoscope listing
const update = async (req, res) => {
    //TODO

    const person = new personalInformationCombo(req.body);
    personalInformationCombo.findByIdAndUpdate(req.params.Email,{
                                            Name:req.params.Name,
                                            Birthday:req.params.Birthday,
                                            Sign:req.params.Sign,
                                            LocationOfBirth:req.params.LocationOfBirth,
                                            Email:req.params.Email,
                                            Password:req.params.Password

                                            }).then(data =>{
        
            personalInformationCombo.findOne({ '_id': req.params.Email}).then(data=>{
            
            if(data!=null){
                res.status(200).json(data);
            }else{
                res.status(404).send({error: 'Person updated, but lost ' + req.params.Email});
            }

        }).catch(err => {
            res.status(500).send({
                message: err.message || "Saved Person not found: " + req.params.Email
            })
        });

    }).catch(err => {
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
            res.status(200).send(data);
        }else{
             res.status(404).send({error: 'Doc not found: '+req.params.Email});
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message|| "Remove failed: " + req.params.Email

        });
    });
};

//list a horoscopeCombo
const list = async (req, res) => {
    //TODO

    personalInformationCombo.find().sort().then(data =>{
        res.status(200).json(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message||"List failed"
        });
    });
};

module.exports = {
    list,
    remove,
    update,
    read,
    create,
};

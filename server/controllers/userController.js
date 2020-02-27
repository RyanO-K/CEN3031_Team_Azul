//horoscopeCombo is the object we will create when making a new entry
import horoscopeCombo from '../models/horoscopeSchema.js';

//create a horoscope combo
export const create = async (req, res) => {
    const horoscope = new horoscopeCombo(req.body);
    horoscope.save().then(data => {
        res.status(200).send(horoscope);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error on create"
        });
    });
};

//show a horoscope listing
export const read = async (req, res) => {
    //TODO

    horoscopeCombo.findOne({ '_id': req.params.horoscopeID}).then(data =>{
        if(data!=null){
            res.status(200).json(data);
        }else{
            res.status(404).send({error: 'Error doc not found' + req.params.horoscopeID});
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Read failed: " + req.params.horoscopeID
        })
    });



};

//update a horoscope listing
export const update = async (req, res) => {
    //TODO

    const horoscope = new horoscopeCombo(req.body);
    horoscopeCombo.findByIdAndUpdate(req.params.horoscopeID,{

                                            house:horoscope.house,
                                            sign: horoscope.sign,
                                            moonphase:horoscope.moonphase,
                                            description:horoscope.description

                                            },options).then(data =>{
        
                                                horoscopeCombo.findOne({ '_id': req.params.horoscopeID}).then(data=>{
            
            res.status(200).json(data);
        }).catch(err => {
            res.status(404).send({
                message: err.message || "Saved Doc not found: " + req.params.horoscopeID
            })
        });

    }).catch(err => {
        res.status(404).send({
            message: err.message || "Doc update failed:  " + req.params.horoscopeID
        })
    });
};

//remove a horoscopeCombo
export const remove = async (req, res) => {
    //TODO
    horoscopeCombo.findOneAndDelete({ '_id': req.params.horoscopeID}).then(data =>{
        if(data != null){
            res.status(200).send(data);
        }else{
             res.status(200).send({error: 'Some message that indicates an error'});
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message|| "Remove failed: " + req.params.horoscopeID

        });
    });
};

//list a horoscopeCombo
export const list = async (req, res) => {
    //TODO

    horoscopeCombo.find().sort().then(data =>{
        res.status(200).json(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message||"List failed"
        });
    });
};
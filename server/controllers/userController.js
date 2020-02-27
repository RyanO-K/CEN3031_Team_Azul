//horoscopeCombo is the object we will create when making a new entry
import horoscopeCombo from '../models/horoscopeSchema.js';

//create a horoscope combo
export const create = async (req, res) => {
    const horoscope = new horoscopeCombo(req.body);
    horoscope.save().then(data => {
        res.status(200).send(horoscope)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Creation failed."
        });
    });
};

//show a horoscope listing
export const read = async (req, res) => {
    //TODO

    horoscopeCombo.findOne({ '_id': req.params.listingId}).then(data =>{
        if(data!=null){
            res.json(data);
        }else{
            res.status(200).send({error: 'Error'});
        }
    }).catch(err => {
        res.status(404).send({
            message: err.message || "Doc not found: " + req.params.listingId
        })
    });



};

//update a horoscope listing
export const update = async (req, res) => {
    //TODO

    const horoscope = new horoscopeCombo(req.body);
    horoscopeCombo.findByIdAndUpdate(req.params.listingId,{

                                            house:horoscope.house,
                                            sign: horoscope.sign,
                                            moonphase:horoscope.moonphase,
                                            description:horoscope.description

                                            },options).then(data =>{
        
        Listing.findOne({ '_id': req.params.listingId}).then(data=>{
            
            res.status(200).json(data);
        }).catch(err => {
            res.status(404).send({
                message: err.message || "Saved Doc not found: " + req.params.listingId
            })
        });

    }).catch(err => {
        res.status(404).send({
            message: err.message || "Doc not found or updated: " + req.params.listingId
        })
    });
};

//remove a horoscope listing
export const remove = async (req, res) => {
    //TODO
    horoscopeCombo.findOneAndDelete({ '_id': req.params.listingId}).then(data =>{
        if(data != null){
            res.status(200).send(data);
        }else{
             res.status(200).send({error: 'Some message that indicates an error'});
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message||"Internal Server Error"
        });
    });
};

//list a horoscope listing
export const list = async (req, res) => {
    //TODO

    horoscopeCombo.find().sort().then(data =>{
        res.json(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message||"Internal Server Error"
        });
    });
};
//horoscopeCombo is the object we will create when making a new entry
var horoscopeModel = require('../models/horoscopeSchema.js');

//create a horoscope combo
const create = async (req, res) => {
    const horoscope = new horoscopeModel(req.body);


    horoscope.save().then(data => {
        res.status(200).send(horoscope);
    }).catch(err => {
        if (err.code == 11000) {
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
    horoscopeModel.findOne({ '_id': req.params.horoscopeID }).then(data => {
        if (data != null) {
            res.status(200).json(data);
        } else {
            res.status(404).send({ error: 'Doc not found: ' + req.params.horoscopeID });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Read failed: " + req.params.horoscopeID
        })
    });



};

//update a horoscope listing
const update = async (req, res) => {
    //TODO

    const horoscope = new horoscopeModel(req.body);
    horoscopeModel.findByIdAndUpdate(req.params.horoscopeID, {
        _id: horoscope._id,
        house: horoscope.house,
        sign: horoscope.sign,
        moonphase: horoscope.moonphase,
        description: horoscope.description

    }).then(data => {

        horoscopeModel.findOne({ '_id': req.params.horoscopeID }).then(data => {

            if (data != null) {
                res.status(200).json(data);
            } else {
                res.status(404).send({ error: 'Doc updated, but lost ' + req.params.horoscopeID });
            }

        }).catch(err => {
            res.status(500).send({
                message: err.message || "Saved Doc not found: " + req.params.horoscopeID
            })
        });

    }).catch(err => {
        res.status(404).send({
            message: err.message || "Doc update failed: " + req.params.horoscopeID
        })
    });
};

//remove a horoscopeCombo
const remove = async (req, res) => {
    //TODO
    horoscopeModel.findOneAndDelete({ '_id': req.params.horoscopeID }).then(data => {
        if (data != null) {
            res.status(200).send(data);
        } else {
            res.status(404).send({ error: 'Doc not found: ' + req.params.horoscopeID });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Remove failed: " + req.params.horoscopeID

        });
    });
};

//list a horoscopeCombo
const list = async (req, res) => {
    //TODO
    console.log(horoscopeModel);
    horoscopeModel.find().sort().then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "List failed"
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


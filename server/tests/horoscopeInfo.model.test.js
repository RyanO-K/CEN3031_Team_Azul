import mongoose from 'mongoose';
import horoscopeCombo from '../models/horoscopeSchema.js';
import config from '../config/config.js';

let horoscope = {
    house: "First",
    sign: "Aries",
    moonphase: "Fullmoon",
    description: ""
}, id, db;

describe('Listing Schema Unit Tests', () => {
    describe('Saving to database', () => {

        beforeAll(async () => {
            db = await mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true});
            await mongoose.set('useCreateIndex', true);
            await mongoose.set('useFindAndModify', false);
            console.log(`established connection to db at uri: ${config.db.uri}!`);
        });

        afterEach(async () => {
            if (id) {
                await horoscopeCombo.deleteOne({_id: id}).exec(() => {
                    id = null;
                });
            }
        });

        afterAll(async () => {
            await mongoose.connection.close();
        });

        test('saves properly when code and name provided', async (done) => {
            await new horoscopeCombo({
                house:horoscope.house,
                sign: horoscope.sign,
                moonphase:horoscope.moonphase,
                description:horoscope.description
            }).save((err, horoscope) => {
                expect(err).toBeNull();
                id = horoscope._id;
                expect(id).not.toBeNull();
                expect(horoscope.house).toBe('First');
                done();
            });
        }, 10000);

        test('saves properly when all three properties provided', async (done) => {
            await new horoscopeCombo(horoscope).save((err, horoscope) => {
                expect(err).toBeNull();
                id = horoscope._id;
                expect(id).not.toBeNull();
                done();
            });
        });

        test('throws an error when sign not provided', async (done) => {
            await new horoscopeCombo({
                sign: horoscope.code
            }).save(err => {
                expect(err).not.toBeNull();
                done();
            });
        });

        test('throws an error when moonphase not provided', async (done) => {
            await new horoscopeCombo({
                moonphase: horoscope.moonphase
            }).save(err => {
                expect(err).not.toBeNull();
                done();
            });
        });

        test('throws an error when code not provided', async (done) => {
            await new horoscopeCombo({
                house: horoscope.house
            }).save((err) => {
                expect(err).not.toBeNull();
                done();
            })
        });

    });
});

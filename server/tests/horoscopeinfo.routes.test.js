import horoscopeCombo from '../models/horoscopeSchema.js';
import axios from 'axios';
import mongoose from 'mongoose';
import config from "../config/config.js";

/* Global variables */
let id, id2;
beforeAll(() => {
    axios.defaults.baseURL = 'http://localhost:5000';
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true}).then(() => {
        console.log(`Successfully connected to mongoose database for testing.`)
    });
    jest.setTimeout(20000);
});
/**
 * TODO: Modify tests for Jest. Remove old timeout code.
 */
/* Unit tests for testing server side routes for the listings API */
describe('Horoscope CRUD tests', () => {

    test('should it able to retrieve all horoscope Combo', async (done) => {
        const response = await axios.get('/api/horoscopeID');
        expect(response.status).toBe(200);
        expect(response.data).toBeTruthy();
        expect(response.data).toHaveLength(147);
        done();
    });

    test('should be able to save a horoscopeCombo', async (done) => {
        const horoscope = {
            house: "Second",
            sign: "Taurus",
            moonphase: "Newmoon",
            description: ""
        }, id, db;

        const response = await axios.post(
            '/api/horoscopeID/', horoscope);
        expect(response.status).toBe(200);
        expect(response.data._id).toBeTruthy();
        expect(response.data.house).toEqual('Second');
        expect(response.data.sign).toEqual('Taurus');
        expect(response.data.moonphase).toEqual('Newmoon');

        id = response.data._id;

        done();
    });

    test('should be able to update a horoscope Combo', async (done) => {
        const updatedListing = {
            code: 'CEN3031',
            name: 'Introduction to Software Engineering',
            address: '432 Newell Dr, Gainesville, FL 32611'
        };

        const response = await axios.put('/api/horoscopeID/' + id, updatedListing);

        expect(response.data._id).toBeTruthy();
        expect(response.data.house).toEqual('Second');
        expect(response.data.sign).toEqual('Taurus');
        expect(response.data.moonphase).toEqual('Newmoon');
        
        done();
    });

    test('should be able to delete a horoscope Combo', async (done) => {

        // NOTICE: This test depends on two tests prior, aka the saving test.
        // You cannot run this test individually. It must run with the suite.
        const deleteResponse = await axios.delete(`/api/horoscopeID/${id}`);
 
        expect(deleteResponse.status).toBe(200);
        expect(deleteResponse.data).toBeTruthy();
        
        const getResponse = await axios.get(`/api/horoscopeID/${id}`);
        
        
        expect(getResponse.status).toBe(200);
        expect(getResponse.data.error).not.toBeNull();
        id = null;

        done();
    });


    /*If this test fails because you haven't completed the  coordinates.server.controller.js file
  use the filter feature in MongoDB Atlas to find and delete the entry
  {'code' : 'GMC'}
  This should resolve the issue. Although the test has failed our create function still
  sends the listing to the database.

  You can comment the two coordinate tests until you have completed the code the
  coordinates.server.controller.js file
*/

    test('should be able to save a listing with coordinates', async (done) => {
        const listing2 = {
            code: 'GMC',
            name: 'Dr. Gardner-McCunes Office',
            address: '432 Newell Dr, Gainesville, FL 32611'
        };

        await axios.post('/api/listings/', listing2).then((response) => {
            expect(response.status).toBe(200);
            expect(response.data.name).toEqual('Dr. Gardner-McCunes Office');
            expect(response.data.code).toEqual('GMC');
            expect(response.data.address).toEqual('432 Newell Dr, Gainesville, FL 32611');
            expect(response.data.coordinates.latitude).not.toBeNaN();
            expect(response.data.coordinates.longitude).not.toBeNaN();
            id2 = response.data._id;
        });

        done();

    });

    test('should be able to delete the listing with coordinates', async (done) => {
        const deleteResponse = await axios.delete('/api/listings/' + id2);

        expect(deleteResponse.status).toBe(200);
        expect(deleteResponse).toBeTruthy();

        const getResponse = await axios.get('/api/listings/' + id2);
        expect(getResponse.status).toBe(200);
        expect(getResponse.data.error).not.toBeNull();
        id = null;

        done();
    });

    afterAll(() => {
        mongoose.connection.close();
        // process.kill();
    })
});

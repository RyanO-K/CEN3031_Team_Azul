//const exampleRouter = require('../routes/examples.server.routes');

    import path from 'path';
    import bodyParser from 'body-parser';
    import morgan from 'morgan';
    import express from 'express';
    import mongoose from 'mongoose';
    import uri from './config.js';
    import model from '../models/horoscopeSchema.js';
    import exampleRouter from '../routes/examples.server.routes.js';

export default {
    init: () => {
        /* 
            connect to database
            - reference README for db uri
        */
        mongoose.connect(String(uri.db.uri),{useNewUrlParser: true,useUnifiedTopology: true});
        mongoose.set('useCreateIndex', true);
        mongoose.set('useFindAndModify', false);

        // initialize app
        const app = express();

        // enable request logging for development debugging
        app.use(morgan('dev'));

        // body parsing middleware
        app.use(bodyParser.json());

        // add a router
        app.use('/api/example', exampleRouter);

        if (process.env.NODE_ENV === 'production') {
            // Serve any static files
            app.use(express.static(path.join(__dirname, '../../client/build')));

            // Handle React routing, return all requests to React app
            app.get('*', function(req, res) {
                res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
            });
            }

        return app
    }

}
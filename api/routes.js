import e from 'express';
import express from 'express';
//import { bodyParser } from 'body-parser';
import { apiService } from './apiService.js';

let app = express();

let worker = new apiService();

let router = express.Router();

router.use('/', (req, res, next) => {
    //console.log('Middleware Hit');
    next();
});

router.get('/v1', async (req, res, next) => {
    let request = req.query.r;
    // deal with all get requests
    switch(request) {
        case "getDeviceUUID":
            worker.getDeviceUUID().then(r => res.status(200).json({ uuid: r })).catch(e => res.status(500).json({ error: e }));
            break;
        case "getDeviceTime":
            worker.getDeviceTime().then((r) => {
                res.status(200).json({ status: "OK" });
            })
                .catch(e => res.status(500).json({ error: e }));
            break;
        case "getScreenshot":
            worker.getScreenshot().then((r) => {
                res.status(200).sendFile(r);
            })
                .catch(e => res.status(500).json({ error: e }));
            break; 
        default: 
            res.status(501).json({ error: "Server does not support method: " + request });
            
    }

    //res.status(200).json({ response: "OK", requestWas: request });
    next();
});

router.post('/v1', async (req, res, next) => {

});

export { router, app };
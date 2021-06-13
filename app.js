import { router, app } from "./api/routes.js";
import fs from 'fs';
import { rconfig, setConfigVars } from './utils/mconfig.js'
import e from "express";

const config_path = './config/config.js';
// Import app config from ./config/config.json

function start(config) {
    rconfig(config_path).then(async (r) => {
        let config = await JSON.parse(data);
        const port = config.manPort
        

        // Start app

        app.use('/api', router);
        app.listen(port, () => {
            console.log("Starting on port " + port)
        });
    });
}

if(fs.access('./config')) {
    if(fs.existsSync(config_path)){
        rconfig(config_path)
            .then(async (r) => {
                let config = await JSON.parse(r);
                start(config);
            })
            .catch(async (e) => {
                console.error("Unable to read config file.  Starting with defaults...");
                let config = await setConfigVars();
                start(config);
            });
    }
    else {
        
    }
}
else {
    fs.mkdirSync('./config')
}







/*
*****TODO*****
1) refactor config file access code (so we only have to write it once)
2) on first run generate config file
3) develope error handling for file access issues

v0.0.2 
1) api call to update node server
    - from url
    - from zip or other package
*/
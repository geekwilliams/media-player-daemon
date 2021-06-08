import { router, app } from "./api/routes.js";
import express from 'express';
import fs from 'fs';


// Import app config from ./config/config.json
fs.readFile('./config/config.json', async (err, data) => {
    if (err) {
        console.error("ERROR: Unable to read configuration file.  App will not start.");
    }
    else { 
        // Set config & vars
        let config = await JSON.parse(data);
        const port = config.manPort
        

        // Start app

        app.use('/api', router);
        app.listen(port, () => {
            console.log("Starting on port " + port)
        });
    }
})



/*
*****TODO*****
1) refactor config file access code (so we only have to write it once)
2) on first run generate config file
3) develope error handling for file access issues
*/
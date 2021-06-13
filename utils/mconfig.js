import fs from 'fs';
import os from 'os';
import child_process from 'child_process';




function rconfig(param) {
    return new Promise((resolve, reject) => {
        fs.readFile(param, (err, data) => {
            if(err) {
                console.error("Encountered and error reading file: " + err);
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });

}

function wconfig(file, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, (err, data) => {
            if(err) {
                console.error("Encountered and error writing file: " + err);
                reject(err);
            }
            else{
                // resolve 0 (exit code) if nothing went wrong
                resolve(0);
            }
        });
    });
}

async function setConfigVars() {
    let config;

    // get player IP address & mac
    let network = await os.networkInterfaces();
    let eth = network[0];
    config.networkId = eth.mac;
    config.cidr = eth.cidr;
    
    //////////FINISH HERE



}


const config_template = {
    deviceFingerprint: "uuid-test",
    networkId: "mac-address-",
    cidr: "ip-address",
    manPort: 8080,
    contentUrl: "url-placeholder",
    lastContentUpdate: "NONE",
    lastPowerOn: "date/time-placeholder"
    
}
export { rconfig, wconfig, setConfigVars }
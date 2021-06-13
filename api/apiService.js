import fs from 'fs';
import * as child_process from 'child_process';
import e from 'express';
import { rconfig, wconfig } from '../utils/mconfig.js';


export class apiService {
    constructor(){

    }

    // getters first
    getDeviceInfo() {
        return new Promise((resolve, reject) => {
            fs.readFile('./config/config.json', (err, data) => {
                if (err){ 
                    console.error("Unable to read config file. Does it exist?");
                    reject(err);
                }
                else {                
                    let d = JSON.parse(data);
                    resolve(d);
                }
            });
        });
    }
    getDeviceUUID(){
        return new Promise((resolve, reject) => {
            resolve('00000000-0000-0000-0000-000000000000');
        });
        
    }
    getDeviceTime(){
        return new Promise((resolve, reject) => {
            resolve('Device Time Placeholder');
        });
        
    }
    getScreenshot(){
        return new Promise((resolve, reject) => {
            child_process.exec('xwd -root -display :0.0 | convert xwd:- /home/pi/screenshot.png', (err, stdout, stderr) => {
                if (err) {
                    console.error(`An error occured: ${stderr}`)
                    reject("There was an error generating a screenshot.  Please try again later.");
                }
                else {
                    resolve('/home/pi/screenshot.png');
                }
            });            
        });
        
    }

    // setters next
    setDeviceUUID(uuid) { 
        return new Promise((resolve, reject) => {
            // create backup of config file
            console.log("Configuration change requested...Making a backup");
            child_process.exec('cp ./config/config.json ./config/config.json.backup', (err, stdout, stderr) => {
                if (err) {
                    console.log("Unable to create backup. Does config file exist?");
                    reject(err);
                }
                else {
                 //read in current config
                     fs.readFile('./config/config.json', async (err, data) => {
                        if (err){ 
                            console.error("Unable to read config file, attempting to restore backup...");
                            child_process.exec('cp ./config/config.json.backup ./config/config.json', (err, stdout, stderr) => {
                                if (err) {
                                    console.error("Unable to restore backup. Does it exist?");
                                    reject(err);
                                }
                                else {
                                    console.log("Backup restored. Unable to update settings. Please try again.");
                                    reject(err);
                                }
                            });
                            reject(err);
                        }
                        else{
                            let config = await JSON.parse(data);
                            config.deviceFingerprint = uuid;
                        
                            let string_config = JSON.stringify(config);
                        
                            fs.writeFile('./config/config.json', string_config, (err) => {
                                if (err) reject(err);
                                console.log("Config file updated with device fingerprint of " + uuid);
                                resolve(uuid);
                            });
                        }
                    });
                }
            });
        });   
    }
}





 
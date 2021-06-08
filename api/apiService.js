import * as fs  from 'fs';
import * as child_process from 'child_process';



export class apiService {
    constructor(){

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
            const generateScreenshot = child_process.exec('xwd -root -display :0.0 | convert xwd:- /home/pi/screenshot.png', (err, stdout, stderr) => {
                if (err) {
                    console.error(`stderr: ${stderr}`)
                    reject({ error: "There was an error generating a screenshot.  Please try again later." });
                }
                else {
                    resolve('/home/pi/screenshot.png');
                }
            });            
        });
        
    }


}





 
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
            resolve('Device Screenshot requested...');
        });
        
    }


}





 
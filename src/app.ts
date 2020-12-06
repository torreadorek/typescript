import express,{Application,Router} from 'express';
import {IController} from './interfaces/interfaces';
import 'reflect-metadata';
import {createConnection} from 'typeorm';

class App {

    private port:number;
    private app:Application;

    constructor(port:number,controllers: IController[]) {
        this.port = port;
        this.app = express();
        this.initializeRoutes(controllers);
    }

    private initializeRoutes = (controllers:IController[]) => {   
        controllers.map(element=>{
            this.app.use(element.path,element.router);
        }) 
    }


    public listen = () => {
        this.app.listen(this.port,()=>{
            console.log(`Listening on port ${this.port}`);
        }).on('error',()=>{
            throw new Error(`Unable to listen on port ${this.port}`);
        })
    }
}

export = App;
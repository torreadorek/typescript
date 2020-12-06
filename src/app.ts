import express,{Application,Router} from 'express';
import {IController} from './interfaces/interfaces';
import 'reflect-metadata';
import {createConnection,ConnectionOptions} from 'typeorm';
import dotenv from 'dotenv';
import {config} from './config/typeormconfig';
import errorHandler from './utils/errorHandler';
import bodyParser from 'body-parser';
dotenv.config({path:__dirname+'/../.env'});

class App {

    private port:number;
    private app:Application;

    constructor(port:number,controllers: IController[]) {
        this.port = port;
        this.app = express();
        this.initializeMiddlewares();
        this.initializeDatabase();
        this.initializeRoutes(controllers);
    }

    private initializeRoutes = (controllers:IController[]) => {   
        controllers.map(element=>{
            this.app.use(element.path,element.router);
        }) 
    }

    private initializeDatabase = () => {
        createConnection(config).then(connection=>{
            if(connection) console.log('Connected to database');
            connection.runMigrations();
        }).catch(error=>{ throw new Error('Cannot connect to database');});
    }

    private initializeMiddlewares = () => {
        this.app.use(errorHandler);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:false}));
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
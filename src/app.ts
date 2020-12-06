import express,{Application,Router} from 'express';
import {IController} from './interfaces/interfaces';
import 'reflect-metadata';
import {createConnection} from 'typeorm';
import dotenv from 'dotenv';
import checkEnvVariable from './utils/checkEnvVariable';
import errroHandler from './utils/errorHandler';
import errorHandler from './utils/errorHandler';
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
        createConnection({
            type:'mysql',
            host: checkEnvVariable(process.env.DB_HOST),
            username: checkEnvVariable(process.env.DB_USERNAME),
            password: checkEnvVariable(process.env.DB_PASSWORD),
            database: checkEnvVariable(process.env.DB_NAME),
            entities:['./src/entities/**/*.ts','./dist/entities/**/*.ts'],
            migrationsRun:true,
            migrations:['./src/migrations/**/*.ts','./dist/migrations/**/*.ts'],
            synchronize:true
        }).then(connection=>{
            if(connection) console.log('Connected to database');
            connection.runMigrations();
        }).catch(error=>{ throw new Error('Cannot connect to database');});
    }

    private initializeMiddlewares = () => {
        this.app.use(errorHandler);
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
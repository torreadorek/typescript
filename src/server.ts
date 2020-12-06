import { parse } from 'path';
import App from './app';
import checkEnvVariable from './utils/checkEnvVariable';
import * as dotenv from 'dotenv';
import Auth from './routes/auth';
import Car from './routes/car';
dotenv.config({path:__dirname+'/../.env'});

const application = new App(
    parseInt(<string>checkEnvVariable(process.env.PORT)),
        [
           new Auth,
           new Car
        ]
    );

application.listen();
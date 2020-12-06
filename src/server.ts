import { parse } from 'path';
import App from './app';
import checkEnvVariable from './utils/checkEnvVariable';
import * as dotenv from 'dotenv';
import User from './routes/user';
import Car from './routes/car';
dotenv.config({path:`${__dirname}/config/.env`});

const application = new App(
    parseInt(<string>checkEnvVariable(process.env.PORT)),
        [
           new User,
           new Car
        ]
    );

application.listen()
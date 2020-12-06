import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
import checkEnvVariable from './../utils/checkEnvVariable';
dotenv.config({path:__dirname+'/../../.env'});

export const config : ConnectionOptions = {
    type:'mysql',
    host: checkEnvVariable(process.env.DB_HOST),
    username: checkEnvVariable(process.env.DB_USERNAME),
    password: checkEnvVariable(process.env.DB_PASSWORD),
    database: checkEnvVariable(process.env.DB_NAME),
    entities:['./src/entities/**/*.ts'],
    migrationsRun:true,
    migrations:['./src/migrations/**/*.ts'],
    synchronize:true
}
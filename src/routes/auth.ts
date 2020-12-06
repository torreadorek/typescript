import express,{Router,Request,Response,NextFunction} from 'express';
import bcrypt from 'bcrypt';
import { getConnection, getRepository } from 'typeorm';
import User from '../entities/user';

class Auth  {

    router:Router = express.Router();
    path:string = '/auth';

    constructor(){
        this.router.post('/register',this.register);
    }

    private register =  async (req:Request,res:Response,next:NextFunction) =>{
        try{
            const {username,password} = req.body;
            const hashedPassword = await bcrypt.hash(password,10);

            const isExist = await getRepository(User).findOne({
                where:{
                    username
                }
            })
            if(isExist) res.status(409).json({message:'User already exist'});
            else {
                const register = getRepository(User).create({
                    username,
                    password:hashedPassword
                })
                const user = await getRepository(User).save(register);
                if(register) res.status(200).json({message:'User created',data:user}); 
                else res.status(503).json({message:'Cannot create new user'});
            }
             
        }catch(error) { next(error) }
    }

    
}

export default Auth;
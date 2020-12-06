import express,{Router,Request,Response,NextFunction} from 'express';


class User  {
     router:Router = express.Router();
     path:string = '/user';

    constructor(){
        this.router.get('/information',this.information);
    }

    private information = (req:Request,res:Response,next:NextFunction) =>{
        res.status(200).json({message:'Success'});
    }
}

export default User;
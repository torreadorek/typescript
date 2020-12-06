import express,{Router,Request,Response,NextFunction} from 'express';

class Car {
    
    router:Router = express.Router();
    path:string = '/car';

    constructor() {
        this.router.get('/information',(req:Request,res:Response,next:NextFunction)=>{
            res.status(200).json({message:'Success'});
        }) 
    }
}

export default Car
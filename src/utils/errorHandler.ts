import {Request,Response,NextFunction,ErrorRequestHandler} from 'express';

export = (error:Error,req:Request,res:Response,next:NextFunction) => {
    res.status(500).json({message:'Something went wrong'});
}
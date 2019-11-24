import { Application, Request,Response, NextFunction  } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class AuthController {
    
    public getApiController = async (req:Request, res:Response) => {
        res.json({
            message:"This is role base application"
        });
    }
}



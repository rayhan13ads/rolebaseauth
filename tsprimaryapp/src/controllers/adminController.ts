import { Application, Request,Response, NextFunction  } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class AdminController {
    public indexController = async (req:Request, res:Response) => {
        res.render('index');
    }
}



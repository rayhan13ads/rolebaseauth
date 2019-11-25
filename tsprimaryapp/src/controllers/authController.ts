import { Application, Request,Response, NextFunction  } from "express";
import { inject, injectable } from "inversify";
import passport from "passport";
import jwt from "jsonwebtoken";
import { authProps } from '../helpers/auth_helper';
import { Model } from 'mongoose';

const User = require('../models/auth');
const config = require('../config/database');

@injectable()
export class AuthController {
    
    public getApiController = async (req:Request, res:Response) => {
        res.json({
            message:"This is role base application"
        });
    }

    public register(req:Request,res:Response){

        let newUser = new User({
           name: req.body.name,
           email: req.body.email,
           username: req.body.username,
           password: req.body.password,
           contact: req.body.contact,
        });

        User.addUser(newUser,(err:any, user:any)=>{
                if (err) {
                    let message  = ""
                    if (err.errors.username) message = "Username is already taken .";
                    if (err.errors.username) message += "email is already exists .";
                    
                   return res.json({
                        success:false,
                        message:message
                    });

                }else{
                   return res.json({
                        success: true,
                        message: "User registration successfuly."
                    });
                }
        });
       
    }
}



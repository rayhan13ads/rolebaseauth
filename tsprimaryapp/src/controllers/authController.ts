import { Application, Request,Response, NextFunction  } from "express";
import { inject, injectable } from "inversify";
import passport from "passport";
import jwt from "jsonwebtoken";
import { authProps } from '../helpers/auth_helper';
import { Model } from 'mongoose';
import { log } from "util";

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


    public login(req:Request,res:Response){
        const username = req.body.username;
        const password = req.body.password;

        console.log(req.body.username);
        

        User.getUserByUsername(username, (err:any,user:any)=>{
            if(err) throw err;
            console.log(user);
            
            if (!user) {
                return res.json({
                    success: false,
                    message: 'User not found .'
                });
            }
            User.comparePassword(password, user.password,(err:any, isMatch:any) =>{
                if(err) throw err
                
                if (isMatch) {
                    const token = jwt.sign({
                        type:'user',
                        data :{
                            _id: user.id,
                            username:user.username,
                            name: user.name,
                            email: user.email,
                            contact: user.contact
                        }
                    }, config.secret,{
                        expiresIn: 604800,
                    });


                    return res.json({
                        success: true,
                        token : "JWT "+token

                    });
                }else {
                    
                    return res.json({
                        success: true,
                        message: "password invalid."

                    });
                }

            });
        });
    }

    public getProfile(req:Request, res:Response){
            return res.json(req.user);
    }


}



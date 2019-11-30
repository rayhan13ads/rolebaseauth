import { Application, Request,Response, NextFunction  } from "express";
import { inject, injectable } from "inversify";
import passport from "passport";
import jwt from "jsonwebtoken";
import { authProps } from '../helpers/auth_helper';
import { Model } from 'mongoose';
import { log } from "util";

const Admin = require('../models/admin');
const config = require('../config/database');
@injectable()
export class AdminController {
    public indexController = async (req:Request, res:Response) => {
        res.render('index');
    }

    public register(req:Request,res:Response){

        let newAdmin = new Admin({
           name: req.body.name,
           email: req.body.email,
           username: req.body.username,
           password: req.body.password,
           contact: req.body.contact,
           job_profile:req.body.job_profile
        });

        Admin.addAdmin(newAdmin,(err:any, user:any)=>{
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
                        message: "Admin registration successfuly."
                    });
                }
        });
       
    }


    public login(req:Request,res:Response){
        const username = req.body.username;
        const password = req.body.password;

        console.log(req.body.username);
        

        Admin.getByUsername(username, (err:any,admin:any)=>{
            if(err) throw err;
            console.log(admin);
            
            if (!admin) {
                return res.json({
                    success: false,
                    message: 'Admin not found .'
                });
            }
            Admin.comparePassword(password, admin.password,(err:any, isMatch:any) =>{
                if(err) throw err
                
                const {id, username, name, email,contact, job_profile} = admin;
                if (isMatch) {
                    const token = jwt.sign({
                        type:'admin',
                        data :{
                            _id: id,
                            username:username,
                            name: name,
                            email: email,
                            contact: contact,
                            job_profile: job_profile
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



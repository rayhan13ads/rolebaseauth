import { Document, Schema } from "mongoose";

export class authProps{
    constructor(name:String,email:String,username:String,password:String,contact:String){
            this.name = name
            this.email = email
            this.password = password
            this.username = username
            this.contact = contact
    }
    name:String;
    email:String;
    username:String;
    password:String;
    contact:String;

}


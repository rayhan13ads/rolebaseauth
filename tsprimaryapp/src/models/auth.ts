import mongoose, {Schema} from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt, {hash} from "bcryptjs";





const UserSchema:Schema = new Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        unique:true,
        index:true,
        required:true
    },
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    }
}) ;


UserSchema.plugin(uniqueValidator);

const User = module.exports = mongoose.model('User',UserSchema);


//find user id
module.exports.getUserById = (id:String, callback:Function) =>{
    User.find(id,callback);
}


// find by username
module.exports.getUserByUsername = (username:String, callback:Function)=>{
    const query = {
        username:username
    }
    User.findOne(query,callback);
}


//add user
module.exports.addUser = async (newUser: any, callback:Function ) => { 
     
    const password = newUser.password;
    
    try{
        // const salt = await bcrypt.genSalt(10);   
        hash(password, 10, (er, h) => {
            console.log(er, h);
            callback();
        });
    }catch(ex){
        console.log(ex);
    }
   //await newUser.save(callback)

  }

  // check password

  module.exports.comparePassword = (password:any,hash:any,callBack:Function) =>{
    bcrypt.compare(password,hash, (err:Error,isMatch:Boolean)=>{
            if(err) throw err;
            callBack(null,isMatch);
    })
  }

import mongoose, {Schema} from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt, {hash} from "bcryptjs";





const AdminSchema:Schema = new Schema({
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
    },
    job_profile:{
        type: String,
        required: true
    }
}) ;


AdminSchema.plugin(uniqueValidator);

const Admin = module.exports = mongoose.model('Admin',AdminSchema);


//find user id
module.exports.getById = (id:any, callback:Function) =>{
    const query ={
        _id:id
    }
    Admin.findOne(query,callback);
}


// find by username
module.exports.getByUsername = (username:String, callback:Function)=>{
    const query = {
        username:username
    }
    Admin.findOne(query,callback);
}


//add user
module.exports.addAdmin = async (newUser: any, callback:Function ) => { 
     
    let password = newUser.password;
    
    try{
        const salt = await bcrypt.genSalt(10);   
        password = await  hash(password, salt);
        newUser.password = await password
        newUser.save(callback)
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

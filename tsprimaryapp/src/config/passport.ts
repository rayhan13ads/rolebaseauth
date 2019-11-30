import { ExtractJwt, Strategy } from "passport-jwt";



const config = require('./database');
const User = require('../models/auth');
const Admin = require('../models/admin');

module.exports = (userType:any,passport:any)=>{
    let opts:any = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.secret;

    passport.use(new Strategy(opts,(jwt_payload,done) =>{
        console.log(jwt_payload.data._id);

        if (userType === 'admin') {
            Admin.getById(jwt_payload.data._id, (err:any,admin:any) =>{
                if(err) return done(err, false);
                //if(user) 
                return done(null, admin);
                //return done(null, false);
            });
        }

        if (userType === 'user') {
            User.getUserById(jwt_payload.data._id, (err:any,user:any) =>{
                if(err) return done(err, false);
                //if(user) 
                return done(null, user);
                //return done(null, false);
            })
        }

      
    } ));

}
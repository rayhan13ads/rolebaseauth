import express, {Application, Request, Response, NextFunction} from "express";
import adminRouter from "./routes/admin";
import authRouter from "../src/routes/auth";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";

//intialize app
const app:Application = express();

//define port
const port = process.env.PORT || 5000




// define static folder
app.use(express.static(path.join(__dirname,'public')));


// define middleware
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());


// define view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

// define routers
app.use(adminRouter);
app.use(authRouter);

//define listen
app.listen(port, ()=>{
    console.log(`Express Server runing....${port}`);
})
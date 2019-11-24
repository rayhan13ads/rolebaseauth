import express from "express";
import {admin}  from "../config/controllers";
const router = express.Router();

router.get('/',admin.indexController);



export default router;
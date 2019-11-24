import express from "express";
import {authController}  from "../config/controllers";
const router = express.Router();

router.get('/api',authController.getApiController);



export default router;
import express from "express";
import {authController}  from "../config/controllers";
const router = express.Router();

router.get('/api',authController.getApiController);

router.post('/api/user',authController.register);

export default router;
import express from "express";
import passport from "passport";
import {authController}  from "../config/controllers";
const router = express.Router();

router.get('/api',authController.getApiController);

router.post('/api/user/register',authController.register);
router.post('/api/user/login',authController.login);
router.get('/api/user/profile',passport.authenticate('jwt', {session:false}),authController.getProfile);

export default router;
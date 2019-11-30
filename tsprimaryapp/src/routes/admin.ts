import express from "express";
import {admin}  from "../config/controllers";
import passport from "passport";

const router = express.Router();

router.get('/',admin.indexController);

router.post('/api/admin/register',admin.register);
router.post('/api/admin/login',admin.login);
router.get('/api/admin/profile',passport.authenticate('jwt', {session:false}),admin.getProfile);

export default router;
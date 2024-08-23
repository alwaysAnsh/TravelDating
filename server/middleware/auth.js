import express from 'express'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();


export const auth = async(req, res, next ) => {
    try {
        // console.log("iniside auth middleware")
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");
        if(!token)
        {
            //return the response
            return res.status(401).json({
                success: false,
                message: "Token in missing",
            })
        }
        //but if token is found then do the necessary verification
        try {
            const decode = await jwt.verify(token, process.env.JWT_SECRET)
            console.log("decode is: ", decode);
            req.user = decode
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is not verified, User is unauthorized",
            })
        }

        //if everything is alright then proceed further 
        next();
        

    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "Something went wrong while verifying token.",
            error: error.message
        })
        console.log("inside catch of /middleware/auth.js - ", error);
    }
}
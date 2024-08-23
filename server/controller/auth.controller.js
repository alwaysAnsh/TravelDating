import express from 'express'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config();
import cookieparser from 'cookie-parser'
import jwt from 'jsonwebtoken'


export const test = async(req, res) => {
    try {
        console.log("test route api hit!!");    
    } catch (error) {
        console.log("error....inside catch block - ",error)
    }
}

export const login = async(req, res) => {
    try {
        // console.log("login route api hit!!");
        const {email, password} = req.body
        //validdate
        if(!email || !password )
        {
            return res.status(401).json({
                success: false,
                message: "Details not found, please fill out the necessary details."
            })
        }
        //check if user exists or not
        const user = await User.findOne({email})
        if(!user)
        {
            return res.status(401).json({
                success: false,
                message: "User not registered, Please signUp first."
            })
        }
        const payload = {
            email: user.email,
            id: user._id,
            role: user.role
        }
        //if it exists then hash the password and generate token
        if(await bcrypt.compare(password, user.password))
        {
            //generate token
            const token = await jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: "24h"} )
            user.token = token;
            // console.log("user is: ", user);
            // console.log('user.token is : ', user.token);
            user.password = undefined   //make the password undefind once the user is verified

            //create the cookie
            const options = {
                expiresIn: new Date(Date.now() + 2*24*60*60*1000),
                httpOnly: true,
            }
            res.cookie("Token", token, options ).status(200).json({
                success: true,
                message: "Logged in successfully.",
                token,
                user,
            })
        }
        else{
            return res.status(401).json({
                success: false,
                message: "unauthorized access. password is incorrect"
            })
        }

        // ********LOGIN RESPONSE ************
        
        

    } catch (error) {
        console.log('login error inside catch - ', error)
        return res.status(404).json({
            success: false,
            message: "Something went wrong while logging in. Please try again after sometime."
        })
    }
    
}

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword, role } = req.body;

        // Validation
        if (!firstName  || !email || !password || !confirmPassword || !role) {
            return res.status(400).json({
                success: false,
                message: "Please fill out the necessary fields."
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match."
            });
        }

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered. Please log in or use a different email."
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await User.create({
            firstName: firstName,
            larstName: larstName,
            email,
            password: hashedPassword,
            role,  // This could be either 'creator' or 'joiner'
            image: `https://api.dicebear.com/6.x/initials/svg?seed=${firstName}%20${lastName}`
        });

        // Return response
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred during signup. Please try again."
        });
    }
};
    

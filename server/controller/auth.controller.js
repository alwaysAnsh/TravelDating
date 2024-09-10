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
        const { firstName, lastName, email, password, confirmPassword, phoneNumber, role } = req.body;

        // Validation
        if (!firstName  || !email || !password || !confirmPassword  ) {
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
            lastName: lastName,
            email,
            phoneNumber,
            password: hashedPassword,
            role,  // This could be either 'creator' or 'joiner'
            image: `https://api.dicebear.com/6.x/initials/svg?seed=${firstName}%20${lastName ? lastName : ''}`
        });

        // Return response
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        });

        // response format
        // {
        //     "success": true,
        //     "message": "User registered successfully",
        //     "user": {
        //         "firstName": "kaalu",
        //         "email": "k@gmail.com",
        //         "password": "$2a$10$lJHPyo2BInTFcGVtU2wKae9B/2R.uOH.cGAIDhO3JbgaaX8zHnjVS",
        //         "image": "https://api.dicebear.com/6.x/initials/svg?seed=kaalu%20undefined",
        //         "role": "creator",
        //         "createdTrips": [],
        //         "joinedTrips": [],
        //         "posts": [],
        //         "_id": "66c904aa17f0fa45c3cebeda",
        //         "createdAt": "2024-08-23T21:52:42.577Z",
        //         "updatedAt": "2024-08-23T21:52:42.577Z",
        //         "__v": 0
        //     }
        // }


    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred during signup. Please try again."
        });
    }
};


export const saveFcmToken = async (req, res) => {
    try {
      
    
      
      
      const { token, userId } = req.body;
    //   const {userId} = req.params.id;
      
    //   console.log("Received token: ", token);
    //   console.log("Received userId: ", userId);
  
      if (!token) {
        console.log("Error: Token is missing");
        return res.status(400).json({
          success: false,
          message: "FCM token not found, please generate one and try again"
        });
      }
  
      
      const user = await User.findByIdAndUpdate(userId, { fcmToken: token }, { new: true });
      
      
    //   console.log("User after update: ", user);
  
      if (!user) {
        console.log("Error: User not found");
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
     
      res.status(200).json({ success: true, message: 'FCM token updated successfully' });
      
    } catch (error) {
      
      console.error('Error in saveFcmToken:', error.message || error);
      res.status(500).json({
        success: false,
        message: "Something went wrong updating FCM token in user DB",
        error: error.message || error
      });
    }
  }
  

    

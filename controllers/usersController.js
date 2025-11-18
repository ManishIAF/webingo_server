import {getUserByEmail,createUser} from '../services/user/userService.js'
import { createRefreshAndAccessToken } from "../utilities/createRefreshAndAccessToken.js";
import checkPassword from '../utilities/checkPassword.js';
//import verifyAccount from "../services/veryfyAccount/verifyAccount.js";

import AppError from "../utilities/AppError.js";

import bcrypt from "bcrypt";

const Login = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            throw new AppError('Please provide email and password', 400);
        }
        
        // valid user returned from login service
        const user = await getUserByEmail(email,true);
        
        if (!user._id) {
            throw new AppError('User not found', 404);
        }
        
        const isPasswordCorrect = await checkPassword(password, user.password);

        if (!isPasswordCorrect) {
            throw new AppError('Invalid Password', 400);
        }

        // create refresh and access token
        const {refreshToken, accessToken} = createRefreshAndAccessToken({_id:user._id,role:user.role});
        
        // set refresh token in cookie
        res.cookie("webingo", refreshToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 7*24*60*60*1000),
            secure: true,
            sameSite: 'none'
        });

        res.status(200).json({
            success: true,
            data: {
                user:{
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                accessToken,
            },
        });
    }
    catch (error) {
        next(error);
    }
}

const Signup = async (req, res,next) => {
    
        try {
            
            console.log('req body : ',req.body);
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                throw new AppError('Please provide all fields', 400);
            }

            const user = await getUserByEmail(email);
            console.log('existing user : ',user);

            if(user._id){
                throw new AppError('User already exists', 404);
            }
        
            const hashedPassword = await bcrypt.hash(password, 10);
        
            await createUser(name, email, hashedPassword);
    
            res.status(201).send({
                success: true,
                message: 'user created successfully.'
            });

        } catch (error) {
            console.log('error message : ',error.message)
            next(error);
        }
}


const logout = async(req,res) => {
    try {
        
        res.clearCookie("webingo", {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });

        res.status(200).send({
            success:true,
            message:'user logged out successfully'
        })

    } catch (error) {
        
        res.status(500).send({
            success:false,
            message:'Server error'
        })

    }
}

export {Login,Signup,logout};  
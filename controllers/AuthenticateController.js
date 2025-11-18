import jwt from "jsonwebtoken";
import User from "../models/user.js";

const Authenticate = async(req,res) => {
    try {
        
        const {user_id} = req.user;

        const user = await User.findOne({_id: user_id});

        if(!user) return res.status(401).json({success:false,message: "user not found"});

        res.status(200).json({success:true,data:{user:{_id:user?._id,name:user?.name,email:user.email,role:user?.role}}});

    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}

const refreshAccessToken = async(req,res) => {
    try {

        let token;
        
        token = req.cookies["webingo"];

        if(!token) return res.status(401).json({success:false,message:'forbidden'});

        const decodedData = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

        if(!decodedData) return res.status(401).json({success:false,message:'forbidden'});

        const user = await User.findOne({_id: decodedData.user_id});

        if(!user) return res.status(401).json({success:false,message:'forbidden'});

        const accessToken = jwt.sign(
            {user_id: user._id},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '15m'}
        );

        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }

        res.status(200).json({success:true,data:{user:userData,accessToken}});

    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}


export { Authenticate,refreshAccessToken };
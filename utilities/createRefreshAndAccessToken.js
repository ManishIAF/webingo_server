import jwt from "jsonwebtoken";

const createRefreshAndAccessToken = (user) => {

    const refreshToken = jwt.sign(
        {user_id: user._id,...user},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '7d'}
    );

    const accessToken = jwt.sign(
        {user_id: user._id,...user},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '15m'}
    );


    return { refreshToken, accessToken };
    
}

export {createRefreshAndAccessToken}
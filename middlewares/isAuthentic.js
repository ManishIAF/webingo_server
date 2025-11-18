import jwt from 'jsonwebtoken';

const isAuthentic = (req, res, next) => {
    try {
        
        const authHeader = req?.headers['authorization'] || req?.headers['Authorization'];
        //console.log('authHeader : ',authHeader);
        //  taking token from header
        const token = authHeader?.split(' ')[1]?.replace(/"/g, '');
        //console.log('token after split: ',token);
        //const token = authHeader;
        
        if (!token) {

            let cookie;
            // console.log('cookie : ',req.cookies);

            cookie = req.cookies["webingo"];

            //console.log('cookie : ',cookie);

            if(!cookie) {
                return res.status(401).json({
                    success: false,
                    message: "Access Denied"
                });
            }
         
            const decodedData = jwt.verify(cookie, process.env.REFRESH_TOKEN_SECRET);

            if(!decodedData?.user_id) {
                return res.status(401).json({
                    success:false,
                    message:'Access Denied'
                });
            }

            // console.log('unauthorized token');

            return res.status(403).json({
                success: false,
                message: "unauthorized"
            });

        }
        //console.log('token : ',token);
        const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        //console.log('decodedData : ',decodedData);
        if (!decodedData) {
            // console.log('unauthorized decodedData not found');
            return res.status(403).json({
                success: false,
                message: "unauthorized"
            });
        }

        const {user_id} = decodedData;

        req.user = {user_id};

        next();

    } catch (error) {
        
        // console.log('error:',error);
        if(error?.name === 'TokenExpiredError') {
            return res.status(403).json({
                success: false,
                message: "Token expired"
            });
        }
        return res.status(500).json({success:false,message: "Internal server error"})

    }
}

export {isAuthentic};
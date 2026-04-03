import { verifyToken } from "../utils/jwt/index.js";

export const authenticate = (req,res,next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided"});
        }

        const token = authHeader.split(" ")[1];

        const decoded = verifyToken(token);

        req.user = decoded;

        next();
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

export const authorize = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                message: "Access Denied"
            });
        }
        next();
    };
};
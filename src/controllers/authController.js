import { createUser, getuserByEmail} from "../services/userService.js";
import { hashPassword, comparePassword } from "../utils/bcrypt/index.js";
import { generateToken } from "../utils/jwt/index.js";

export const register = async (req, res) => {
    try {
        const { name, email, password, role, roll_number, branch } = req.body;

        if(!email.endsWith("@nitp.ac.in")){
            res.status(400).json({
                message : "Use College email"
            });
        }

        const password_hash = await hashPassword(password);

        const user = await createUser({
            name,
            email,
            password_hash,
            role,
            roll_number,
            branch,
        });

        res.status(201).json({
            message : "User Registered Successfully",
            user,
        });
        
    } catch (error) {
        res.status(500).json({
            error : error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await getuserByEmail(email);

        if(!user){
            return res.status(404).json({
                message : "User not found"
            });
        }

        const ismatch = await comparePassword(password,user.password_hash);

        if(!ismatch){
            return res.status(404).json({
                message : "Invalid Credentials"
            });
        }

        const token = generateToken({
            id : user.id,
            role : user.role,
        });

        res.json({
            message : "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                role:user.role,
            },
        });
    } catch (error) {
        register.status(500).json({
            error : error.message
        });
    }
}
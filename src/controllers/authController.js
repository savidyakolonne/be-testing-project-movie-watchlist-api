import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

// const register = async (req, res) => {
//     res.json({message: " register works "});
// };

const register = async (req, res) => {
    // const body = req.body ; 
    // res.json(body);

    const { name, email, password} = req.body ; 

    //check if user exists in the table
    const userExists = await prisma.user.findUnique({
        where : { email: email},
    });

    if(userExists){
        return res
        .status(400)
        .json({ error : "User already exists with this email"})
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashPassword,
        },
    });

    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id ,
                name: name,
                email: email ,
            },
        },
    });
};


const login = async (req, res) => {
    const { email, password } = req.body ; 

    //check if email exists in the table
    const user = await prisma.user.findUnique({
        where : { email: email},
    });

    if(!user){
        return res
        .status(401)
        .json({ error : "Invalid email or password"})
    }

    //verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res
        .status(401)
        .json({ error : "Invalid email or password"})
    }

    //generate JWT token
    const token = generateToken(user.id, res);

    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id ,
                email: email ,
            },
            token ,
        },
    });
};

const logout = async(req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true ,
        expires: new Date(0),
    });
    res.status(200).json({
        status: "success",
        message: "Logged out successfully" ,   
    });
};

export {register, login, logout} ; 
import userModel from "../../../../DB/models/User.model.js";
import { comparePasswprd, hash } from "../../../Services/HashAndCompare.js";
import { generateToken, verifyToken } from "../../../Services/generateAndVerifyToken.js";
import { sendEmail } from "../../../Services/sendEmail.js";
import { loginSchema, signupSchema } from "../auth.validation.js";

export const signup = async (req, res)=>{

    const {userName, email, password} = req.body;
    const user = await userModel.findOne({ email });
    if(user){
      return res.status(409).json({message:"email already in use"});
    }
    const hashPassword = hash(password);

    const token = generateToken({email}, process.env.EMAIL_TOKEN);
    const link = `https://saraha-0pol.onrender.com/auth/confirmEmail/${token}`;
   await sendEmail(email,"confirm email", `<a href="${link}">verfiy your email</a>`);

    const createUser = await userModel.create({userName,email,password:hashPassword});
    return res.status(201).json({message:"Done", user:createUser._id});
    
}

export const confirmEmail = async (req,res)=>{

    const {token} = req.params;

    const decoded = await verifyToken(token, process.env.EMAIL_TOKEN);
   const user = await userModel.updateOne({email:decoded.email},{confirmEmail:true});
    return res.json({message:"your email is confirmed, you can login now"});
}

export const login = async (req, res)=>{

    const {email, password} = req.body;

    const user = await userModel.findOne({ email });
    if(!user){
        return res.status(404).json({message:"user not found"});
    }else{

        if(!user.confirmEmail){
            return res.status(404).json({message:"plz confirm your email"});
        }

        const match = comparePasswprd(password, user.password);
        if(!match){
            return res.json({message:"invalid password"});
        }else{
            const token = await generateToken({id:user._id});
            return res.status(200).json({message:"success", token:token});
        }
    }

}
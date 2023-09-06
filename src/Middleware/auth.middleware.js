import { verifyToken } from "../Services/generateAndVerifyToken.js";
import userModel from "../../DB/models/User.model.js";

export const auth = async (req, res, next)=>{

   const {authorization} = req.headers;
  
   if(!authorization?.startsWith(process.env.BEARERKEY)){
    return res.json({message:"missing authorization"});
   }

   const token = authorization.split(process.env.BEARERKEY)[1];
   if(!token){
    return res.json({message:"invalid token"});
   }
   const decoded = verifyToken(token);
   const AuthUser = await userModel.findById(decoded.id);
   if(!AuthUser){
    return res.status(401).json({message:"not registered user"}); 
   }
  req.id = decoded.id;
   next();
}
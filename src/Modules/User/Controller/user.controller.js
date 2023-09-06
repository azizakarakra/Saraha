import userModel from "../../../../DB/models/User.model.js";
import cloudinary from "../../../Services/cloudinary.js";

export const profile = (req,res)=>{
    return res.json({message: req.id });
}


export const profilePic = async (req,res)=>{
        if(!req.file){
        return res.json({message:"file is required"});
    }

   // const imageUrl = req.file.destination + "/" + req.file.filename;
   const {secure_url} = await cloudinary.uploader.upload(req.file.path,{folder:'saraha/user'});
  // return res.json(cloud);
    const user = await userModel.updateOne({_id:req.id}, {profilePic:secure_url});
    return res.status(200).json({message:"profile picture is updated successfully"});
}
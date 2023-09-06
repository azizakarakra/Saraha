import messageModel from "../../../../DB/models/Message.model.js";
import userModel from "../../../../DB/models/User.model.js";

export const getMessage = async (req,res)=>{

    const messageList = await messageModel.find({receiverId:req.id});
    return res.json({message:"success",messageList});
}


export const sendMessage = async (req,res)=>{

    const {receiverId} = req.params;
    const {message} = req.body;

    const user = await userModel.findById(receiverId);

    if(!user){
        return res.status(404).json({message:"invalid account id"});
    }

    const createMessage = await messageModel.create({receiverId,message});
    return res.json({message:"success",createMessage});
}

export const deleteMessage = async (req, res) => {

    const id = req.id;
    const {messageId} = req.params;

    const message = await messageModel.deleteOne({_id:messageId,receiverId:id});

    if(message.deleteCount==0){
        return res.json({message:"invalid user id"}); 
    }

    return res.json({message:"success"});
}
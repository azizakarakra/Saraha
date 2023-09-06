import multer from "multer";

export const HME = (err,req,res,next)=>{
    
    if(err){
        return res.status(404).json({message:"multer error",err});
    }else{
        return next();
    }
}

function fileUpload(){

    const storage = multer.diskStorage({
    // destination:(req,res,cb)=>{

    //     cb(null, 'uploads');
    // },
    // filename:(req,file,cb)=>{
    //     cb(null,Date.now() + Math.random() + '_' + file.originalname);
    // }

    

    });

    function fileFilter(req, file, cb){

        if(['image/jpeg','image/png','image/gif'].includes(file.mimetype)){

            cb(null,true);
    }else{

        cb("invalid format", false);
    }
}

    const upload = multer({fileFilter:fileFilter,storage:storage});
    return upload;
}

export default fileUpload;
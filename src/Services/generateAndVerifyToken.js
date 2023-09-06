import jwt from "jsonwebtoken";

export const generateToken = (payload, signature = process.env.SEGNATURE, expiresIn='1h')=>{

    const token = jwt.sign(payload, signature, {expiresIn});
    return token;
}

export const verifyToken = (token, signature = process.env.SEGNATURE)=>{

    const decoded = jwt.verify(token, signature);
    return decoded;
}
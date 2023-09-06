import bcrypt from 'bcrypt';

export const hash = (plainText, saltRound=process.env.SALTROUND) =>{

    const hashResult =  bcrypt.hashSync(plainText, parseInt(saltRound));
    return hashResult;
}

export const comparePasswprd = (password, hashValue) =>{

    const compareP = bcrypt.compareSync(password, hashValue);
    return compareP;
}
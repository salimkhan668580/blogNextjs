import jwt from "jsonwebtoken"


function genToken(payload){
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
}

export default genToken;

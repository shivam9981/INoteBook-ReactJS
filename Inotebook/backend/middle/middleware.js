
const jwttoken = require('jsonwebtoken')
const jtoken = 'SHIVAMGUPTA';

const fatchuser = (req,res, next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).json({error:"Enter your valid token"})
    }
    try{
        const data = jwttoken.verify(token,jtoken);
        req.user = data.user;
        next()
    }
    catch (error){ 
        console.log(error)
        res.status(401).json({error:"token not valid"})
    }
}

module.exports = fatchuser;
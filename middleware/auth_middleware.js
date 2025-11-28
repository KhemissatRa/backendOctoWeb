const jwt =require('jsonwebtoken');
const jwtPrivateKey = process.env.JWT_SECRET;

const Auth= (req,res,next)=>{
    const token= req.header('x-auth-token');
    if(!token){
        return res.status(401).json({message:"Access Denied.No token provided"})
    }
    try{
        const decoded= jwt.verify(token,jwtPrivateKey);     
        req.user=decoded;
        next();
    }catch(error){
        res.status(400).json({message:"Invalid Token"})
    }           


}
module.exports=Auth;
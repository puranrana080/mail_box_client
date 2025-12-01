import jwt from "jsonwebtoken"
import User from "../models/user.js"



export  const authenticate = async(req,res,next)=>{
    try{
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1];
        }
        if(!token){
            return res.status(402).json({message:"Unauthorizes:No Token"})
        }

        const decode = jwt.verify(token,process.env.JWT_SECRET)
        req.user = await User.findById(decode.userId).select("-password")
        if(!req.user){
            return res.status(401).json({message:"User not found"})
        }
        next()

    }
    catch(error){
         if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired ,Login Again" });
    }
        return res.status(401).json({message:"Invalid token",error})
    }
}
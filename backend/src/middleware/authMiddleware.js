import jwt from "jsonwebtoken";

const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    console.log(authHeader);

    if(!authHeader||!authHeader.startsWith("Bearer ")){
        return res.status(400).json({message:"Token Is Missing"})
    }
    const token=authHeader.split(" ")[1];
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded)
        req.user = decoded;
        console.log(req.user);

        next();
    }catch(error){
        console.log(" JWT error",error)
        return res.status(401).json({ message: "Invalid token" });
    }
    
}
export default authMiddleware;
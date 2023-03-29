const jwt = require("jsonwebtoken");
require("dotenv").config();

const userAuth = (req,res,next)=>{
    const token = req.headers.authorization;
    const decoded = jwt.verify(token,process.env.key)
    if(decoded && decoded.role=='user'){
        next()
    }
    else{
        res.status(400).send({msg:"Authorization failed, please login"})
    }
};

const adminAuth = (req,res,next)=>{
    const token = req.headers.authorization;
    const decoded = jwt.verify(token,process.env.key)
    if(decoded && decoded.role=='admin'){
        next()
    }
    else{
        res.status(400).send({msg:"Authorization failed, please login"})
    }
};

module.exports ={userAuth,adminAuth}
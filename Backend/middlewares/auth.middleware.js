const jwt = require("jsonwebtoken");
require("dotenv").config();

const userAuth = (req,res,next)=>{
    const token = req.headers.authorization;

      
  if (!token) {
    return res.status(403).json({ message: 'Authorization failed, No token provided' , status:403});
  }

  jwt.verify(token, process.env.key, (err, decoded) => {
    if(decoded && decoded.role=='user'){
        req.body.userID = decoded.userID
        req.body.username = decoded.username
        next()
    }
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token.',status:401 });
    }

    // if (decoded.expiry <= Date.now()) {
    //   return res.status(401).json({ message: 'Token has expired.' });
    // }

  }); 
};

const adminAuth = (req,res,next)=>{
    const token = req.headers.authorization;

      
  if (!token) {
    return res.status(403).json({ message: 'No token provided.' });
  }

  jwt.verify(token, process.env.key, (err, decoded) => {
    if(decoded && decoded.role=='admin'){
        req.body.userID = decoded.userID
        next()
    }
    if (err || decoded.role!=="admin") {
      return res.status(401).json({ message: 'Failed to authenticate token.' });
    }

    if (decoded.expiry <= Date.now()) {
      return res.status(401).json({ message: 'Token has expired.' });
    }
    
  });
};

module.exports ={userAuth,adminAuth}
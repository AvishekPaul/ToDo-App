const jwt = require('jsonwebtoken');
const createError = require('./createError')


const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.cookie.split("=")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                next(createError({ status: 401, message: 'Unauthorized, invalid token' }));
            }
            else {
                req.user = decoded;
                next();
            }
            
          });
    }

    catch(err){
        next(createError({ status: 401, message: 'Unauthorized' }));
        console.log(err)
    }
    
    
  
  
};

module.exports = checkAuth;
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        
      console.log(req.body);
      
    
     const token = req.cookies.token;
      console.log("token is === ", token);

      //token is not avilable
      if (!token || token === undefined) {
        return res.status(401).json({
          success: false,
          message: "token is missing"
        });
      }
    
      try {

        //decode the token

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log("it is decode",decode);
       
        //authorization is successful

        req.user = decode;
        next();

      } catch (error) {

          //Token is Missing

        return res.status(401).json({
          success: false,
          message: "token is invalid"
        });
      }
    } catch (error) {

      //Error while Authorization

      return res.status(401).json({
        success: false,
        message: "something went wrong while verifying token"
      });
    }
  };

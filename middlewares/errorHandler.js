const {VALIDATION_ERROR,FORBIDDEN,NOT_FOUND} = require("../constants")

const errorHandler = (err,req,res,next)=>{
    const status = res.statusCode ? res.statusCode : 400 ;
    switch (status) {
        case VALIDATION_ERROR :
            res.status(status).json({
                title : "Validation Failed",
                message : err.message,
                stack : err.stack});
            break;
        case FORBIDDEN :
            res.status(status).json({title : "Forbidden",message : err.message,stack : err.stack});
            break;
        case NOT_FOUND :
            res.status(status).json({title : "Not Found",message : err.message,stack : err.stack});
            break;
        default :
        res.status(status).json({title : "Server Error",message : err.message,stack : err.stack});
        break ;
    }
    
}

module.exports = errorHandler ;
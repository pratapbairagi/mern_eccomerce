const ErrorHandler = require("../utils/errorHandler")

module.exports = (...roles) => {
    return (req, res, next) =>{
        if( !roles.includes(req.user.role)){
            return next( new ErrorHandler(`Role :${req.role} is not allowed to access this facility !`, 400))
        }

        return next()
    }
}
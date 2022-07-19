
// module.exports = theFunc => ( req,res, next) =>{
//     Promise.resolve(theFunc(req, res,next)).catch((e)=>next(e))
// }

module.exports = theFun => (req,res,next) =>{
    
    Promise.resolve(theFun(req,res, next)).catch((e)=>next(e))
}
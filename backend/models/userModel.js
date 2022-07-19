
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        unique : true,
        required : [true, "Please enter Your Name !"],
        minlength :[3, "Name should have atleast 3 charactors !"],
        maxlength:[15, "Name can not exceed 15 charactors !"]
    },
    email:{
        type: String,
        unique : true,
        required : [true, "Please enter Your Email !"],
    },
    password:{
        type: String,
        required : [true, "Please enter Your Password !"],
        minlength :[8, "Password should have atleast 8 charactors !"]
    },
    phone:{
        type: Number,
        required : [true, "Please enter Your Phone Number !"],
        minlength :[10, "Number should have 10 digits !"],
        maxlength:[10, "Number can not exceed 10 digits !"]
    },
    avatars:{
        public_id:{
            type : String,
        },
        url:{
            type:String
        }
    },
    createdAt:{
        type : Date,
        default : Date.now
    },
    role:{
        type:String,
        default :"user"
    },
    resetPasswordToken:String,
    resetPasswordTokenExpiry: String
})

userSchema.pre("save", async function(next){

    if( !this.isModified("password")){
        return next()
    }
    
    this.password = await bcrypt.hash(this.password, 10)
})

// generate a cookie/token to athenticate user
userSchema.methods.generateToken = async function(){

    const token = jwt.sign({id:this._id}, process.env.COOKIE_TOKEN_SECRETY_KEY, {expiresIn : process.env.COOKIE_TOKEN_EXPIRY})

    return token
}

// compare password
userSchema.methods.comparePassword = async function(oldPassword){

   return await bcrypt.compare(oldPassword, this.password)
}

// create reset password token
userSchema.methods.createResetPasswordToken = async function(){

    const token = crypto.randomBytes(20).toString("hex")

    this.resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex")
    this.resetPasswordTokenExpiry = Date.now() + 30 * 60 * 1000

    return token
}

const User = new mongoose.model("User", userSchema)

module.exports = User
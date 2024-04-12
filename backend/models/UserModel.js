const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const  jwt  = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxLength:[30,"Name cannot excced 30 characters"],
        minLength:[4,"Name shout have more than 4 characters"],
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter valid email address"],
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minLength:[8,"password should be 8 charachter"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
});


//arrow function ke andar this use nhi kr skte isiliye ye function bnaya hai
userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
})
//JWT token
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}

//generating password reset token
userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");

    //Hashing and adding to userSchma
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hext");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
}
module.exports = mongoose.model("User",userSchema)

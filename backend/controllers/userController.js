const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto");

//Register a User
exports.registerUser = async(req,res,next)=>{
    try{
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields of a user is required",
            })
        }

        const user = await User.create({
            name,
            email,
            password,
            avatar:{
                public_id:"This is a sample id",
                url:"profile pic Url"
            }
        })

        sendToken(user,200,res);


        
    }catch(error){

        if(error.code ==  11000){
            return res.status(400).json({
                success:false,
                message:`Duplicate email Entered`,
            })
        }else{

            console.log("Error occured in creating user",error);
            res.status(500).json({
                success:false,
                message:"User could not be created"
            })
        }

    }
}


exports.loginUser = async(req,res)=>{
    try{
        console.log("comming to the login controller")
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please Enter email and password",
            })
        }

        const user = await User.findOne({email}).select("+password");

        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid email or password"
            })
        }

        //401 ->unauthorized



            const response =  await bcrypt.compare(password,user.password)
            if(!response){
                return res.status(401).json({
                   success:false,
                   message:"Invalid email or password",
               })
           }

           sendToken(user,200,res);
    }catch(error){

        console.log("error occured in login",error);
        res.status(500).json({
            success:false,
            message:"Error occured in login",
        })

    }
}

exports.logout = async(req,res)=>{
    try{

        res.cookie("token",null,{
            expires:new Date(Date.now()),
            httpOnly:true,
        })

        res.status(200).json({
            success:true,
            message:"Logged Out",
        })

    }catch(error){
        console.log("error occured in logout",error);

        return res.status(500).json({
            success:false,
            message:"Error occured in logout",
        })
    }
}

//forgot password
exports.forgotPassword = async(req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found",
            })
        };

        const resetPassword = user.getResetPasswordToken();
        await user.save({validateBeforeSave:false});

        const resetPasswordUrl = `http://localhost:3000/update-password/${resetPassword}`


        const message = `your password reset token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested for this email please ignore  it`;

        try{

            await sendEmail({
                email:user.email,
                subject:`Ecommerece password recovery`,
                message
            });
            res.status(200).json({
                success:true,
                message:"Email sent successfully"
            })
        }catch(error){
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({validateBeforeSave: false});
            console.log(error.message)
            return res.status(500).json({
                success:false,
                message:"Error occures while reset password"
            })
        }
    }catch(error){
        console.log("Error occured while reset password",error);
        return res.status(500).json({
            success:false,
            message:"Error occured while reset password",
        })
    }
}

//reset password

exports.resetPassword = async(req,res)=>{
    try{

        //creating token hash
        const resetPasswordToken = crypto.createHash("sha256").update(req.body.token).digest("hext");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire:{$gt:Date.now()},
        })
        if(!user){
            return res.status(404).json({
                success:false,
                message:"Reset password token not found"
            })
        }

        if(req.body.password !== req.body.confirmPassword){
            return res.status(400).json({
                success:false,
                message:"password and confirm password do not match"
            })
        }

        user.password = req.body.password;
        user.resetPasswordToken =undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        sendToken(user,200,res);

    }catch(error){
        console.log("error occured while reset the passwore",error);
        res.status(500).json({
            success:false,
            message:"error occured while reset the passwore"
        })

    }
}


//get user details
exports.getUserDetails = async(req,res,next)=>{
    try{
        const id = req.user.id;
        const user = await User.findById(id);

        res.status(200).json({
            success:true,
            user,
        })
    }catch(error){
        console.log("error occured while getching user details",error);
        res.status(500).json({
            success:false,
            message:"error occured while getching user details",
        })

    }
}

exports.updatePassword = async(req,res)=>{
    try{

        if(!req.body.newPassword || !req.body.oldPassword || !req.body.confirmPassword){
            return res.status(401).json({
                success:false,
                message:"All field are required"
            })
        }
        const id = req.user.id;
        const user = await User.findById(id).select("+password");

        const response =  await bcrypt.compare(req.body.oldPassword,user.password)
        if(!response){
            return res.status(400).json({
                success:false,
                message:"old password is incorrect"
            })
       }



        if(req.body.newPassword !== req.body.confirmPassword){
            return res.status(400).json({
                success:false,
                message:"newpassword and confirm password are not matched"
            })
        }

        user.password = req.body.newPassword;
        await user.save();
        sendToken(user,200,res);
    }catch(error){

        console.log("error occured while updating the user password",error);
        return res.status(500).json({
            success:false,
            message:"'error' occured while updating the user password"
        })

    }
}


exports.updateUserProfile = async(req,res)=>{
    try{
        console.log("hii from updateUserProfile")

        const {name,email} = req.body;
        const newUserData = {
            name,
            email,
        }
        const id  = req.user.id;

        //we will add cloudinary letter
        const user = await User.findByIdAndUpdate(id,newUserData,{new:true,runValidators:true,useFindAndModify:false});

        res.status(200).json({
            success:true,
            message:"User updated successfully",
            user,
        })
    }catch(error){
        console.log("updateuser failed with error",error);
        res.status(500).json({
            success:false,
            message: `not updated successfully${error}`,
            
        })

    }
}

//-> get all user admin
exports.getAllUser = async(req,res)=>{
    try{

        const users = await User.find();
        res.status(200).json({
            success:true,
            users,
        })


    }catch(error){
        console.log("Error occured in fetching all user",error);
        res.status(500).json({
            success:false,
            message:"Error occured in fetching all user",
        })

    }
}


//get single single user details

exports.getSingleUser = async(req,res)=>{
    try{

        const id = req.params.id;
        const user = await User.findById(id);

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found",
            })
        }

        res.status(200).json({
            success:true,
            user,
        })

    }catch(error){
        console.log("Error occured in fetching single user",error);
        res.status(500).json({
            success:false,
            message:"Error occured in fetching single user",
        })

    }
}


//updata user role
exports.updateUserRole = async(req,res)=>{
    try{
        const {name,email,role} = req.body;
        const newUserData = {
            name,
            email,
            role,
        }
        const id  = req.params.id;

        //we will add cloudinary letter
        const user = await User.findByIdAndUpdate(id,newUserData,{new:true,runValidators:true,useFindAndModify:false});

        res.status(200).json({
            success:true,
            user,
            message:"User updated successfully"

        })
    }catch(error){
        console.log("Error occured in updating user role",error);
        res.status(500).json({
            success:false,
            message:"Error occured in updating user role",
        })

    }
}


//delete a user->admin
exports.deleteUser = async(req,res)=>{
    try{

        //we will remove cloudinary
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User does not exist"
            })
        }

        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({success:true, message:"User deleted successfully"})

    }catch(error){
        console.log("Error occured in deleting user role",error);
        res.status(500).json({
            success:false,
            message:"Error occured in deleting user",
        })

    }
}

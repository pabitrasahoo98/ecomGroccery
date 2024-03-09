const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError=require("../middleware/catchAsyncError");
const User=require("../model/userModel");
const sendToken = require("../utils/sendToken");
const sendEmail=require("../utils/sendEmail");
//const crypto=require("crypto");

//register user
exports.registerUser=catchAsyncError(async(req,res,next)=>{
    const {name,email,password,mobileNo}= req.body;
    const user=await User.create({name,email,password,mobileNo});
    sendToken(user,201,res)
})
//login user
exports.loginUser=catchAsyncError(async(req,res,next)=>{
    const {email,password}= req.body;

    if(!email||!password){
        return next(new ErrorHandler("please enter Email and Password",400))
    }
    const user= await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email and password",401))
    }
    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401))
    }
    sendToken(user,200,res);
})
//logout user
exports.logout=catchAsyncError(async(req,res,next)=>{
    res.cookie("token",null,{expires:new Date(Date.now()),httpOnly:true,});
    res.status(200).json({
        sucess:true,
        message:"logged out"
    });
    

});
//forgot password
exports.forgotPassword=catchAsyncError(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("user not found ",404))
    }
    //get otp and save to db
    const otp = Math.floor(Math.random() * 1000000);

    user.resetPasswordOtp = otp;
    user.resetPasswordOtpExpiry = Date.now() + 10 * 60 * 1000;
    const Email=user.email;

    await user.save();
    const message = `Your OTP for reseting the password ${otp}. If you did not request for this, please ignore this email.`;


    /*//get password recovery token
    const resetToken=user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});

    const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message=`Your password reset Token is:-\n\n${resetPasswordUrl}
    \n\n if you are not requested this email then ,please ignore it`;*/
    try {
        await sendEmail({
            email:Email,
            subject:`grocery now pasword reset`,
            message
        });

        res.status(200).json({
            success:true,
            messege:`OTP sent to${user.email} successfully`
        })
        
    } catch (error) {
       /* user.resetPasswordToken=undefined;
        user.resetPasswordExpiry=undefined;*/
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message,500));

    }
});
//reset password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
   /* // creating token hash
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");*/
      const { otp, newPassword } = req.body;

      const user = await User.findOne({
        resetPasswordOtp: otp,
        resetPasswordOtpExpiry: { $gt: Date.now() },
      })
  
   /* const user = await User.findOne({
      resetPasswordToken,
      //resetPasswordExpire: { $gt: Date.now() },
    });*/
  
    if (!user) {
      return next(
        new ErrorHandler(
          "OTP is invalid or has been expired",
          400
        )
      );
    }
  
   /* if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler("Password does not password", 400));
    }*/
  
    user.password = newPassword;
    user.resetPasswordOtp = null;
    user.resetPasswordOtpExpiry = null;
    /*user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;*/
  
    await user.save();
  
    sendToken(user, 200, res);
  });
//get user Details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user=await User.findById(req.user.id);
    res.status(200).json({
        sucess:true,
        user,
    })
})
//update user password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
  
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    }
  
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("password does not match", 400));
    }
  
    user.password = req.body.newPassword;
  
    await user.save();
  
    sendToken(user, 200, res);
  });
// update User Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email:req.body.email,
      mobileNo: req.body.mobileNo,
    };
  
    /*if (req.body.avatar !== "") {
      const user = await User.findById(req.user.id);
  
      const imageId = user.avatar.public_id;
  
      await cloudinary.v2.uploader.destroy(imageId);
  
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
  
      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }*/
  
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
      user
    });
  });
  // Get all users(admin)
exports.getAllUser = catchAsyncError(async (req, res, next) => {
    const users = await User.find();
  
    res.status(200).json({
      success: true,
      users,
    });
  });
  
  // Get single user (admin)
  exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return next(
        new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
      );
    }
  
    res.status(200).json({
      success: true,
      user,
    });
  });
  
  // update User Role -- Admin
  exports.updateUserRole = catchAsyncError(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
  
    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
  });
  
  // Delete User --Admin
  exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return next(
        new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
      );
    }
  
   /* const imageId = user.avatar.public_id;
  
    await cloudinary.v2.uploader.destroy(imageId);*/
  
    await user.deleteOne();
  
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  });
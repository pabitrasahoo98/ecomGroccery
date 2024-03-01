const catchAsyncError=require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const PinCode=require("../model/pinCodeModel");

//creating a new pincode--admin

exports.createPincode=catchAsyncError(async(req,res,next)=>{
    const {pinCode}= req.body;
    const pincodes=await PinCode.create({pinCode});
    res.status(201).json({
        success:true,
        pincodes,
    })
})

//all pincodes

exports.getAllPincode = catchAsyncError(async (req, res, next) => {
    const pincodes=await PinCode.find();
    res.status(200).json({
        sucess:true,
        pincodes,
    })
})
//delete a pincode--admin

exports.deletePincode = catchAsyncError(async (req, res, next) => {
    const pin = await PinCode.findById(req.params.id);
    if (!pin) {
      return next(
        new ErrorHandler(`Pincode does not exist`, 400)
      );
    }
  
  
    await pin.deleteOne();
  
    res.status(200).json({
      success: true,
      message: "Pincode Deleted Successfully",
    });
  })


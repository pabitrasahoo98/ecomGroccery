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

//update pincode--admin
exports.updatePincode=catchAsyncError(async(req,res,next)=>{
  let pin=await PinCode.findById(req.params.id);
  if(!pin){
      res.status(500).json({
          success:false,
          message:"Pincode not found"
      })
  }
await PinCode.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators:true,
      useFindAndModify:false
  });
  res.status(201).json({
      success:true
  })
}
)

//pincode details

exports.getPincode = catchAsyncError(async (req, res, next) => {
  const pincode = await PinCode.findById(req.params.id);

  if (!pincode) {
    return next(
      new ErrorHandler(`Pincode does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    pincode,
  });
});

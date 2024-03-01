const catchAsyncError=require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const Catagory=require("../model/catagoryModel");

//creating a new catagory-admin

exports.createCatagory=catchAsyncError(async(req,res,next)=>{
    const {catagory}= req.body;
    const catagories=await Catagory.create({catagory});
    res.status(201).json({
        success:true,
        catagories,
    })
})

//all catagories

exports.getAllCatagory = catchAsyncError(async (req, res, next) => {
    const catagories=await Catagory.find();
    res.status(200).json({
        sucess:true,
        catagories,
    })
})
//delete a catagory--admin

exports.deleteCatagory = catchAsyncError(async (req, res, next) => {
    const cata = await Catagory.findById(req.params.id);
    if (!cata) {
      return next(
        new ErrorHandler(`Catagory does not exist`, 400)
      );
    }
  
  
    await cata.deleteOne();
  
    res.status(200).json({
      success: true,
      message: "Catagory Deleted Successfully",
    });
  })
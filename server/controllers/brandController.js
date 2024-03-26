const catchAsyncError=require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const Brand=require("../model/brandModel"); 

//creating a new brand-admin

exports.createBrand=catchAsyncError(async(req,res,next)=>{
    const brand=await Brand.create(req.body);
    res.status(201).json({
        success:true,
        brand,
    })
})

//all Brands

exports.getAllBrand = catchAsyncError(async (req, res, next) => {
    const brand=await Brand.find();
    res.status(200).json({
        sucess:true,
        brand,
    })
})
//delete brand--admin

exports.deleteBrand = catchAsyncError(async (req, res, next) => {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return next(
        new ErrorHandler(`Brand does not exist`, 400)
      );
    }
  
  
    await brand.deleteOne();
  
    res.status(200).json({
      success: true,
      message: "Brand Deleted Successfully",
    });
  })

//get catagory wise sub-brand

exports.getCatagoryBrand = catchAsyncError(async (req, res, next) => {
    const id=req.params.id;
    const brand=await Brand.find({ catagory: id }).populate(
      "catagory",
      "catagory"
    );
    res.status(200).json({
        sucess:true,
        brand,
    })
})





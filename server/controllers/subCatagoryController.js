const catchAsyncError=require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const SubCatagory=require("../model/subcatagoryModel"); 

//creating a new sub catagory-admin

exports.createSubCatagory=catchAsyncError(async(req,res,next)=>{
    const subCatagories=await SubCatagory.create(req.body);
    res.status(201).json({
        success:true,
        subCatagories,
    })
})

//all sub catagories

exports.getAllSubCatagory = catchAsyncError(async (req, res, next) => {
    const subCatagories=await SubCatagory.find();
    res.status(200).json({
        sucess:true,
        subCatagories,
    })
})
//delete a Sub catagory--admin

exports.deleteSubCatagory = catchAsyncError(async (req, res, next) => {
    const scata = await SubCatagory.findById(req.params.id);
    if (!scata) {
      return next(
        new ErrorHandler(`SubCatagory does not exist`, 400)
      );
    }
  
  
    await scata.deleteOne();
  
    res.status(200).json({
      success: true,
      message: "Sub Catagory Deleted Successfully",
    });
  })

 // subCatagory by catagory 
exports.getCatagorySubcatagory = catchAsyncError(async (req, res, next) => {
    const id=req.params.id;
    const scata=await SubCatagory.find({ catagory: id }).populate(
      "catagory",
      "catagory"
    );
    res.status(200).json({
        sucess:true,
        scata,
    })
})



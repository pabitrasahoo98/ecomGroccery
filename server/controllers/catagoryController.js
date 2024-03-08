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


 //update catagory--admin
exports.updateCatagory=catchAsyncError(async(req,res,next)=>{
  let cata=await Catagory.findById(req.params.id);
  if(!cata){
      res.status(500).json({
          success:false,
          message:"Catagory not found"
      })
  }
  await Catagory.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators:true,
      useFindAndModify:false
  });
  res.status(201).json({
      success:true
  })
})

//catagories details

exports.getCatagory = catchAsyncError(async (req, res, next) => {
  const catagory = await Catagory.findById(req.params.id);

  if (!catagory) {
    return next(
      new ErrorHandler(`Catagory does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    catagory,
  });
});


const catchAsyncError=require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const Carousel=require("../model/carouselModel");

//creating a new carousel-admin

exports.addCarousel=catchAsyncError(async(req,res,next)=>{
    const {carouselLink,carouselName}= req.body;
    const carousels=await Carousel.create({carouselLink,carouselName});
    res.status(201).json({
        success:true,
        carousels,
    })
})

//all catagories

exports.getAllCarousels = catchAsyncError(async (req, res, next) => {
    const carousels=await Carousel.find();
    res.status(200).json({
        sucess:true,
        carousels,
    })
})
//delete a catagory--admin

exports.deleteCarousel = catchAsyncError(async (req, res, next) => {
    const car = await Carousel.findById(req.params.id);
    if (!car) {
      return next(
        new ErrorHandler(`CarouselLink does not exist`, 400)
      );
    }
  
  
    await car.deleteOne();
  
    res.status(200).json({
      success: true,
      message: "Catagory Deleted Successfully",
    });
  })

  //update carousel--admin
exports.updateCarousel=catchAsyncError(async(req,res,next)=>{
  let car=await Carousel.findById(req.params.id);
  if(!car){
      res.status(500).json({
          success:false,
          message:"Carousel not found"
      })
  }
await Carousel.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators:true,
      useFindAndModify:false
  });
  res.status(201).json({
      success:true
  })
}
)

//carousel details

exports.getCarousel = catchAsyncError(async (req, res, next) => {
  const carousel = await Carousel.findById(req.params.id);

  if (!carousel) {
    return next(
      new ErrorHandler(`Carousel does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    carousel,
  });
});
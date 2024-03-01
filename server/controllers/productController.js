const Product=require("../model/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError=require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");

//create product admin
exports.createProduct=catchAsyncError(async(req,res,next)=>{
    const product=await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    }) 
})
//get product all

exports.getAllProducts=catchAsyncError(async(req,res)=>{

    const resultPerPage=2;
    const productCount=await Product.countDocuments();

    const apifeature=new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const products=await apifeature.query;
    res.status(200).json({
        success:true,
        products,
        productCount,
        resultPerPage})
})

//update product admin

exports.updateProduct=catchAsyncError(async(req,res,next)=>{
    let product=await Product.findById(req.params.id);
    if(!product){
        res.status(500).json({
            success:false,
            message:"product not found"
        })
    }
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(201).json({
        success:true,
        product
    })
})

//delete product admin
exports.deleteProduct=catchAsyncError(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"product not found"
        })
    }
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success:true,
        messege:"product removed successfully"
    })
})

//get a product details

exports.getProductDetails=catchAsyncError(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("product not found",404))
        }
    
    res.status(200).json({
        success:true,
        product,
    
    })
    
})
//get product --admin

exports.getAdminProducts=catchAsyncError(async(req,res)=>{

    const products=await Product.find();
    res.status(200).json({
        success:true,
        products,
    })
})
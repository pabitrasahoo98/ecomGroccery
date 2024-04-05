const Product=require("../model/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError=require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary=require("cloudinary")


//create product admin
exports.createProduct=catchAsyncError(async(req,res,next)=>{
    let images=[];
    if(typeof req.body.images==='string'){
        images.push(req.body.images);
    }
    else{
        images=req.body.images;
    }
    
    const imagesLink=[];
    for (let index = 0; index < images.length; index++) {
        //console.log(images[index]);
        const result = await cloudinary.v2.uploader.upload(images[index],{folder:"products"});
        imagesLink.push({public_id:result.public_id,url:result.secure_url})
    }
    
    req.body.images=imagesLink;
    

    const product=await Product.create(req.body);


    res.status(201).json({
        success:true,
        product
    }) 
})
//get product all
exports.getAllProducts=  catchAsyncError(async (req, res) => {
    const resultPerPage = 16;
    const productCount = await Product.countDocuments();

    let apifeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .sort() // Add sorting based on price
        .pagination(resultPerPage);

    const products = await apifeature.query;

    let p={};

    if(req.query.catagory){
    p=await Product.find({catagory:req.query.catagory})
    }

    if(req.query.subcatagory){
        p=await Product.find({subcatagory:req.query.subcatagory})
        }
    if(req.query.brand){
            p=await Product.find({brand:req.query.brand})
            }

    const filteredProductsCount = p.length;

    res.status(200).json({
        success: true,
        products,
        productCount,
        resultPerPage,
        filteredProductsCount
    });
});



//get dod product 

exports.getDODProducts=catchAsyncError(async(req,res)=>{
    const products=await Product.find({dod:true});
    if(products.length>0){
    res.status(200).json({
        success:true,
        products
    })
    }
    else{
        res.status(200).json({
            success:false
        })

    }
})
//get de product 

exports.getDEProducts=catchAsyncError(async(req,res)=>{
    const products=await Product.find({de:true});
    if(products.length>0){
        res.status(200).json({
            success:true,
            products
        })
        }
        else{
            res.status(200).json({
                success:false
            })
    
        }
})

//get td product 

exports.getTDProducts=catchAsyncError(async(req,res)=>{
    const products=await Product.find({td:true});
    if(products.length>0){
    res.status(200).json({
        success:true,
        products
    })
    }
    else{
        res.status(200).json({
            success:false
        })

    }
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
    //for images
    let images=[];
    if(typeof req.body.images==='string'){
        images.push(req.body.images);
    }
    else{
        images=req.body.images;
    }
    if(images!==undefined){
         //deleting image from cloudinary
        for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
            
        }
        const imagesLink=[];
        for (let index = 0; index < images.length; index++) {
           // console.log(images[index]);
            const result = await cloudinary.v2.uploader.upload(images[index],{folder:"products",resource_type:"image",chunk_size:6000000});
            imagesLink.push({public_id:result.public_id,url:result.secure_url})
        }
        
        req.body.images=imagesLink;

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
    //deleting image from cloudinary
    for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        
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
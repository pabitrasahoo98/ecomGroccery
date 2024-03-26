const mongoose=require("mongoose");
const subCatagorySchema=new mongoose.Schema({
    subCatagory:{
    type:String,
    required:[true,"please enter valid sub-category"],
    },
    catagory:{type:mongoose.Schema.ObjectId,ref:"Catagory",required:true},
    imgLink:{
    type:String,
    required:[true,"please enter proper Link"],
    },


})
module.exports=mongoose.model("SubCatagory",subCatagorySchema);
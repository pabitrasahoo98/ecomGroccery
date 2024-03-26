const mongoose=require("mongoose");
const brandSchema=new mongoose.Schema({
    brand:{
    type:String,
    required:[true,"please enter valid Brand"],
    },
    catagory:{type:mongoose.Schema.ObjectId,ref:"Catagory",required:true}


})
module.exports=mongoose.model("Brand",brandSchema);
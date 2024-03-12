const mongoose=require("mongoose");
const catagorySchema=new mongoose.Schema({
    catagory:{
    type:String,
    required:[true,"please enter valid catagory"],
    },
    imgLink:{
    type:String,
    required:[true,"please enter proper Link"],
    },


})
module.exports=mongoose.model("Catagory",catagorySchema);
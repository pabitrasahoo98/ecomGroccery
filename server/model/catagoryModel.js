const mongoose=require("mongoose");
const catagorySchema=new mongoose.Schema({
    catagory:{
    type:String,
    required:[true,"please enter valid catagory"],
    }


})
module.exports=mongoose.model("Catagory",catagorySchema);
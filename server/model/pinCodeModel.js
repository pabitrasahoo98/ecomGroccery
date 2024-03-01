const mongoose=require("mongoose");
const pinCodeSchema=new mongoose.Schema({
    pinCode:{
    type:String,
    required:[true,"please enter valid pincode"],
    minLength:[6,"password should be greater than 8 characters"],
    unique:true
    }


})
module.exports=mongoose.model("Pincode",pinCodeSchema);
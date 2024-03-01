const mongoose=require("mongoose");
const carouselSchema=new mongoose.Schema({
    carouselLink:{
    type:String,
    required:[true,"please enter valid carousel Link"],
    },
    carouselName:{
        type:String,
        required:[true,"please enter valid carousel Name"],

    }


})
module.exports=mongoose.model("Carousel",carouselSchema);
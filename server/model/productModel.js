const mongoose =require("mongoose");
const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter product name"],
        trim:true  
    },
    description:{
        type:String,
        required:[true,"please enter product description"]
    },
    qty:{
        type:String,
        required:[true,"please enter sub-description"]
    },
    mrp:{
        type:Number,
        required:[true,"please enter product price"],
        maxLength:[8,"price cannot exceed 8 characters"]
    },
    price:{
        type:Number,
        required:[true,"please enter product price"],
        maxLength:[8,"price cannot exceed 8 characters"]
    },
    ratings:{
        type:Number,
        default:0
    },
    dod:{
        type:Boolean,
        default:false
    },
    de:{
        type:Boolean,
        default:false
    },
    td:{
        type:Boolean,
        default:false
    },
    images:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }],
    catagory:{
        type:String,
        required:[true,"please enter product catagory"]
    },
    stock:{
        type:Number,
        required:[true,"please enter product stock"],
        maxlength:[4,"stock cannot exceed 4 characters"],
        default:1
    },
    subCatagory:{
        type:String,
        default:"none"
    },
    brand:{
        type:String,
        default:"none"
    },
    /*reviews:[
        {
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],*/
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("Product",productSchema)
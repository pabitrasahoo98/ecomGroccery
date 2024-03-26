const express=require("express");
const app = express()
const cookieParser=require("cookie-parser")
const cors= require("cors")
const bodyParser=require("body-parser")

const errorMiddleware=require("./middleware/error")
app.use(cors(
    {
        origin:["http://localhost:3000"],
        methods:["GET","POST","PUT","DELETE"],
        credentials:true
    }
));

app.use(express.json({limit:'50mb'}))
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}))

const product=require("./routes/productRoutes")
const user=require("./routes/userRoutes")
const order=require("./routes/orderRoutes")
const pinCode=require("./routes/pinCodeRoutes")
const catagory=require("./routes/catagoryRoutes")
const brand=require("./routes/brandRoutes")
const subcatagory=require("./routes/subCatagoryRoutes")
const carousel=require("./routes/carouselRoutes")
app.use("/api/v1",catagory);
app.use("/api/v1",brand);
app.use("/api/v1",subcatagory);
app.use("/api/v1",order);
app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",pinCode);
app.use("/api/v1",carousel);

//middleware for error
app.use(errorMiddleware);

module.exports=app
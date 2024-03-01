const express=require("express");
const app = express()
const cookieParser=require("cookie-parser")
const cors= require("cors")

const errorMiddleware=require("./middleware/error")
app.use(cors(
    {
        origin:["http://localhost:3000"],
        methods:["GET","POST","PUT","DELETE"],
        credentials:true
    }
));

app.use(express.json())
app.use(cookieParser());

const product=require("./routes/productRoutes")
const user=require("./routes/userRoutes")
const order=require("./routes/orderRoutes")
const pinCode=require("./routes/pinCodeRoutes")
const catagory=require("./routes/catagoryRoutes")
const carousel=require("./routes/carouselRoutes")
app.use("/api/v1",catagory);
app.use("/api/v1",order);
app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",pinCode);
app.use("/api/v1",carousel);

//middleware for error
app.use(errorMiddleware);

module.exports=app
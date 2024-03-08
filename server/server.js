const app=require("./app");
const dotenv=require("dotenv")
const connectDatabase=require("./database")
const cloudinary=require("cloudinary");
//handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.messege}`);
    console.log("shutting down the server uncaught exception")
    process.exit(1);
})

dotenv.config({path:"./config.env"})

connectDatabase();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})


const server=app.listen(process.env.PORT,()=>{
    console.log('server is working')
})


//unhandled promise rejection
process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`)
    console.log("shutting down the server due to unhandled promise rejection")
    server.close(()=>{
        process.exit(1);
    });

});
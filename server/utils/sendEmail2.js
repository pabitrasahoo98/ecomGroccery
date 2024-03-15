const nodeMailer=require("nodemailer");
const sendEmail2=async(options)=>{

    const transporter=nodeMailer.createTransport({
        host:process.env.SMPT_HOST,
        port:process.env.SMPT_PORT,
        secure:true, 
        auth:{
            user:process.env.SMPT_MAIL2,
            pass:process.env.SMPT_PASSWORD2,
        } 
    })
    const mailOptions={
        from:process.env.SMPT_MAIL2,
        to:options.email,
        subject:options.subject,
        text:options.message
    }
    await transporter.sendMail(mailOptions);
}
module.exports=sendEmail2;
const nodemailer= require('nodemailer')

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:process.env.MAIL_USERNAME,
    pass:process.env.MAIL_PASSWORD
  }
})

const sendEmail = async(to,subject,text)=>{
  const mailOption = {
    from:"nosliwsys@gmail.com",
    to:to,
    subject:subject,
    text:text
  }
  try{
    await transporter.sendMail(mailOption)
  }catch(error){
    console.log("error al enviar",error)
  }
}

module.exports ={sendEmail}
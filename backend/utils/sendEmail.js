const nodemailer = require('nodemailer');

const sendEmail = async(options)=>{
    try{

        const transpoter = nodemailer.createTransport({

            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
            
        })

        const mailOptions = {
            from:`Ecommerece Website ${process.env.MAIL_USER}`,
            to:options.email,
            subject:options.subject,
            text:options.message,
        };

      let res  =   await transpoter.sendMail(mailOptions)
      console.log(res);

    }catch(error){
        console.log("mail send krne me error aa gya hai",error);
    }
}

module.exports = sendEmail
const nodeMailer = require("nodemailer")

const sendMail = (option) =>{


    const transport = nodeMailer.createTransport({
        host:"smtp.gmail.com",
        service:"gmail",
        port:587,
        secure:false,
        auth:{
            user:"pratap.bairagi.test@gmail.com",
            // pass:"Pratap-18May1994"
            pass:"tjmk umso mcom ofun" // generated app password

        }
    })

    const mailOption = {
        to : option.to,
        from :"pratap.bairagi.test@gmail.com",
        subject : option.subject,
        text : option.message
    }

    return transport.sendMail(mailOption)
}

module.exports = sendMail
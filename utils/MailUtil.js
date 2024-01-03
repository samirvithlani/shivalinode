const nodemailer = require('nodemailer');
const path = require('path');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pythonforsamir@gmail.com',
        pass: 'eyzfowvclvvnlldu'
    }
})



const sendMail = async(to, subject, text) => {

    const mailOptions = {

        from:"pythonforsamir@gmail.com",
        to: to,
        subject: subject,
        //text: text 
        html:'<h1>Hi</h1><p>Your OTP is 1234 <br> pleaase find attachment here</p>',
        attachments: [
            {
                filename:"book.jpg",
                path: __dirname + '/book.jpg',
                cid: 'book'
            }
        ]
        
    }
   

    const res = await transporter.sendMail(mailOptions)
    console.log(res)

}

//module.exports = sendMail
sendMail("samir.vithlani83955@gmail.com", "Test", "Hello")
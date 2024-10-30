import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

interface SendEmailParams{
    email: string;
    emailType: 'VERIFY' | 'RESET'
    userid: string
}

export const sendEmail = async({email,emailType,userid}: SendEmailParams)=>{
    try {
        const hashedToken= await bcryptjs.hash(userid.toString(),10)

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userid,
                {verifyToken: hashedToken,verifyTokenExpiry:Date.now()+3600000}
            )
        }
        else if(emailType ==="RESET"){
            await User.findByIdAndUpdate(userid,
                {forgotPasswordToken: hashedToken,forgotPasswordTokenExpiry: Date.now()+3600000}
            )
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: process.env.USERID ,
            pass: process.env.PASSKEY
            }
        });

        const mailOptions = {
            from: 'shubham@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: emailType === "VERIFY"? `<p>Click <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}">here</a> to verify your email
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyEmail?token=${hashedToken}
            </p>` : 
            `<p>Click <a href="${process.env.DOMAIN}/resetPassword?token=${hashedToken}">here</a> to reset the password</p>`
        }

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;

    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred while sending the email.");
        }
    }
}
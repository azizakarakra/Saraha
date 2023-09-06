import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(to, subject,html) {
    const transporter = nodemailer.createTransport({
        service:'gmail',
         auth: {
           // TODO: replace `user` and `pass` values from <https://forwardemail.net>
           user: process.env.EMAIL,
           pass: process.env.EMAIL_PASSWORD,
         },
       });
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Aziza Karakra" <foo@example.com>', // sender address
    to,// list of receivers
    subject, // Subject line
    html, // html body
  });

}
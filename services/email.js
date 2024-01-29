import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendMail = async function (to) {
  try {
    let info = await transporter.sendMail({
      from: `Zoro <${process.env.USER_MAIL}>`,
      to,
      subject: "This is a testing mail",
      html: "<h1>Thanks for Subscribing</h1>",
    });

    return info;
  } catch (error) {
    console.log(error);
    res.status(400).json("Failed to send email 😥!!");
  }
};

export default sendMail;

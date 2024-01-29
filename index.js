import express from "express";
import dotenv from "dotenv";
import path from "path";
import sendMailService from "./services/email.js";

dotenv.config();
const __dirname = path.resolve(path.dirname(""));

const app = express();

app.use(express.static(path.resolve(__dirname, "dist")));

app.use(express.json());

app.post("/sendMail", async (req, res) => {
  try {
    const { email: to } = req.body;
    await sendMailService(to);

    res.status(200).json("Mail sent successfully 😀. Please check spam too..");
  } catch (error) {
    res.status(400).json("Failed to send mail 😥");
  }
});

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "dist", "index.html"))
);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 8000");
});

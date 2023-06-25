import express, { Application, Request, Response } from "express";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { MailerConfig, MailerOptions } from "./mailer";

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Welcome to Flipside Mailer",
  });
});

app.post("/api/send", async (req: Request, res: Response) => {
  try {
    const {
      auth,
      mailOptions: options,
    }: { auth: MailerConfig; mailOptions: MailerOptions } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth,
      tls: {
        rejectUnauthorized: false,
      },
    });

    await new Promise((resolve, reject) => {
      // verify connection configuration
      transporter.verify(function (error, success) {
        if (error) {
          //   console.log(error);
          reject(error);
        } else {
          //   console.log("Server is ready to take our messages");
          resolve(success);
        }
      });
    });

    const mailOptions: Mail.Options = {
      from: {
        name: auth.name ?? auth.user,
        address: auth.user,
      },
      replyTo: auth.user,
      ...options,
    };

    await new Promise((resolve, reject) => {
      // send mail
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          // console.error(err);
          reject(err);
        } else {
          // console.log(info);
          resolve(info);
        }
      });
    });
    return res.status(200).json({
      message: "Email sent successfully!",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message || "Something went wrong",
    });
  }
});

app.get("*", (req: Request, res: Response) => {
  return res.status(404).json({
    message: "Path not found!",
  });
});

app.listen(4000, async () => {
  console.log(`Server is running on port ${4000} 🔥`);
});

export * from "./mailer";

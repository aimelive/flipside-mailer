import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { MailerConfig, MailerOptions } from "./mailer";

export async function MailSend({
  auth,
  mailOptions: options,
}: {
  auth: MailerConfig;
  mailOptions: MailerOptions;
}) {
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
}

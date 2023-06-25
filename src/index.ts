import express, { Application, Request, Response } from "express";
import { MailerConfig, MailerOptions } from "./mailer";
import { MailSend } from "./sender";

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
      mailOptions,
    }: { auth: MailerConfig; mailOptions: MailerOptions } = req.body;
    await MailSend({ auth, mailOptions });
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

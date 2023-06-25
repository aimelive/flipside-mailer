import Mail from "nodemailer/lib/mailer";
import { MailSend } from "./sender";

export interface MailerConfig {
  name?: string;
  user: string;
  pass: string;
}

export interface MailerOptions extends Omit<Mail.Options, "from" | "replyTo"> {}

export interface MailerResponse {
  status: "FAIL" | "SUCCESS";
  message: string;
  error?: any;
}

export class FlipsideMailer {
  config: MailerConfig;

  constructor(config: MailerConfig) {
    this.config = config;
  }

  async send(mailOptions: MailerOptions): Promise<MailerResponse> {
    try {
      await MailSend({ auth: this.config, mailOptions });
      return {
        status: "SUCCESS",
        message: "Email sent successfully!",
      };
    } catch (error: any) {
      return {
        status: "FAIL",
        message: error.message || "Email not sent!",
        error: error,
      };
    }
  }
}

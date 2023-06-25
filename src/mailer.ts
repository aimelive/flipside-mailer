import Mail from "nodemailer/lib/mailer";

export interface MailerConfig {
  resolverUrl?: string;
  name?: string;
  user: string;
  pass: string;
}

export interface MailerOptions extends Omit<Mail.Options, "from" | "replyTo"> {}

export interface MailerResponse {
  status: "FAIL" | "SUCCESS";
  message: string;
}

export class FlipsideMailer {
  config: MailerConfig;

  constructor(config: MailerConfig) {
    this.config = config;
  }

  async send(mailOptions: MailerOptions): Promise<MailerResponse> {
    try {
      const result = await fetch(
        `${this.config.resolverUrl || "http:localhost:4000"}/api/send`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            auth: this.config,
            mailOptions,
          }),
        }
      );
      const response = await result.json();
      return {
        status: "SUCCESS",
        message: response.message,
      };
    } catch (error: any) {
      return {
        status: "FAIL",
        message: error.message || "Email not sent!",
      };
    }
  }
}

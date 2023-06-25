# flipside-mailer

FlipsideMailer - A simple npm package to send emails asynchronously built on top of node mailer. Can be used serverside or client side. Sends emails via HTTP instead of SMTP.

### Sample Usage

Config

```bash
import Keys from "@/utils/keys";
import { FlipsideMailer } from "flipside-mailer";

export const mailer = new FlipsideMailer({
  name: "<Sender Name>",
  user: Keys.SENDER_MAIL,
  pass: Keys.SENDER_MAIL_PASSWORD,
});
```

Send message:

```bash
  const result: MailerResponse = await mailer.send({
    to: "<recipient_email>",
    subject: "Greetings!",
    text: "Hello!",
    html: `<p>Hey there, are you okay?</p>`,
  });
```

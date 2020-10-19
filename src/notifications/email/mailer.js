import { createTestAccount, createTransport } from "nodemailer";
import { smtpDetails } from "../../../config";

let transporter = createTransport(smtpDetails);

export default async function (subject, sender, emails) {
  if (Array.isArray(emails)) {
    emails = emails.join(", ");
  }

  try {
    await transporter.sendMail({
      from: `Markus <${sender}>`,
      to: emails,
      subject,
    });
  } catch (err) {
    console.log(err);
  }
}

import loadTemplate from "./loadTemplate";
import { createTransport } from "nodemailer";
import { smtpDetails } from "../../../config";

let transporter = createTransport(smtpDetails);

export default async function (subject, sender, recipients, payload, template) {
  if (!Array.isArray(recipients))
    throw new Error("Recipients must be of type aryay");
  try {
    const html = await loadTemplate(template, payload);
    const info = await transporter.sendMail({
      from: `Markus <${sender}>`,
      to: recipients.join(", "),
      subject,
      html,
    });
    console.log("Message Sent ! to:", recipients);
    return info;
  } catch (err) {
    console.log(err);
    return err;
  }
}

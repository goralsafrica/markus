import loadTemplate from "./loadTemplate";
import { createTransport } from "nodemailer";
import { smtpDetails } from "../../../config";

let transporter = createTransport(smtpDetails);

/**
 *
 * @param {String} subject
 * @param {String} sender
 * @param {[String]} recipients
 * @param {Object} payload
 * @param {String} template
 * @description mailer function: do not use await as it slows down the process
 */
export default async function (subject, sender, recipients, payload, template) {
  if (!Array.isArray(recipients))
    throw new Error("Recipients must be of type aryay");
  try {
    const html = await loadTemplate(template, payload);
    const info = transporter.sendMail({
      from: `Markus <${sender}>`,
      to: recipients.join(", "),
      subject,
      html,
    });
    info
      .then((info) => ({ message: "message sent", result: info }))
      .catch((err) => console.error(err));
  } catch (err) {
    throw new Error(`Email not sent: ${err.message}`);
  }
}

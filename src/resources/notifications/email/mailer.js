import loadTemplate from "./loadTemplate";
import { createTransport } from "nodemailer";
import { smtpDetails } from "../../../config";

let transporter;
(async () => {
  transporter = createTransport(smtpDetails);
})();

export default async function (subject, sender, recipients, payload, template) {
  if (!Array.isArray(recipients))
    throw new Error("Recipients must be of type aryay");
  try {
    const mail = await loadTemplate(template, payload);
    console.log(mail);
    const info = await transporter.sendMail({
      from: `Markus <${sender}>`,
      to: recipients.join(", "),
      subject,
      html: mail,
    });
    console.log("Message Sent ! to:", recipients);
    return info;
  } catch (err) {
    console.log(err);
    return err;
  }
}

// transporter = createTransport(smtpDetails);
//testAccount = await createTestAccount();
// transporter = createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: testAccount.user, // generated ethereal user
//     pass: testAccount.pass, // generated ethereal password
//   },
// });

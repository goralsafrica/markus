import Handlebars from "handlebars";
import {
  createTestAccount,
  createTransport,
  getTestMessageUrl,
} from "nodemailer";
import { smtpDetails } from "../../../config";

let transporter, testAccount;
(async () => {
  // transporter = createTransport(smtpDetails);
  testAccount = await createTestAccount();
  transporter = createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
})();

function loadTemplate(data, template) {}

export default async function (subject, sender, recipients, data, template) {
  if (!Array.isArray(recipients))
    throw new Error("Recipients must be of type aryay");

  try {
    const info = await transporter.sendMail({
      from: `Markus <${sender}>`,
      to: recipients.join(", "),
      subject,
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", getTestMessageUrl(info));
    return info;
  } catch (err) {
    console.log(err);
    return err;
  }
}

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

export default async function (subject, sender, emails, data, template) {
  if (Array.isArray(emails)) {
    emails = emails.join(", ");
  }
  try {
    const info = await transporter.sendMail({
      from: `Markus <${sender}>`,
      to: emails,
      subject,
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", getTestMessageUrl(info));
  } catch (err) {
    console.log(err);
  }
}

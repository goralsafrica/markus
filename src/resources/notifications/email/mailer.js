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
  // transporter = createTransport({
  //   host: "smtp.ethereal.email",
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: testAccount.user, // generated ethereal user
  //     pass: testAccount.pass, // generated ethereal password
  //   },
  // });
  transporter = createTransport(smtpDetails);
})();

function loadTemplate(data, template) {}

export default async function (
  subject,
  sender,
  recipients,
  { verificationCode },
  template
) {
  if (!Array.isArray(recipients))
    throw new Error("Recipients must be of type aryay");
  recipients = recipients.join(", ");
  console.log(recipients);
  try {
    const info = await transporter.sendMail({
      from: `Markus <${sender}>`,
      to: recipients,
      subject,
      html: `<p> Your verification code is ${verificationCode} ... </p>`,
    });
    console.log("Message Sent !");
    return info;
  } catch (err) {
    console.log(err);
    return err;
  }
}

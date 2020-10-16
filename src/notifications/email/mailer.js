import { createTestAccount, createTransport } from "nodemailer";

export default async function () {
  try {
    const transporter = createTransport({});
  } catch (err) {
    console.error(err);
  }
}

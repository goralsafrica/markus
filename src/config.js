import { config } from "dotenv";

config(".env");
const {
  MONGO_TEST_URI,
  MONGO_DEV_URI,
  SECRET_KEY,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASSWORD,
} = process.env;

const port = process.env.PORT || 8000;

const dbURI = //MONGO_DEV_URI;
  process.env.NODE_ENV == "development" ? MONGO_DEV_URI : MONGO_TEST_URI;

const secretKey = SECRET_KEY;
console.log(process.env.INIT_CWD);
const smtpDetails = {
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT == 465,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
};
export { port, dbURI, secretKey, smtpDetails };

import { config } from "dotenv";

config(".env");
const {
  TEST_DB_URI,
  DEV_DB_URI,
  STAGING_DB_URI,
  SECRET_KEY,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASSWORD,
} = process.env;

const port = process.env.PORT || 8000;

const dbURI = STAGING_DB_URI;

const secretKey = SECRET_KEY;
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

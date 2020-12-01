import { config } from "dotenv";

config(".env");
const {
  DEV_DB_URI,
  STAGING_DB_URI,
  SECRET_KEY,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASSWORD,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
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

const awsCredentials = {
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
};

export { port, dbURI, secretKey, smtpDetails, awsCredentials };

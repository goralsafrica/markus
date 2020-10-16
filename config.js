import { config } from "dotenv";

config(".env");
const { MONGO_TEST_URI, MONGO_DEV_URI, SECRET_KEY } = process.env;
const port = process.env.PORT || 8000;
const dbURI =
  process.env.NODE_ENV == "development" ? MONGO_DEV_URI : MONGO_TEST_URI;
const secretKey = SECRET_KEY;

export { port, dbURI, secretKey };

import { connect } from "mongoose";

export default function (app, config) {
  const uri =
    config.NODE_ENV == "development"
      ? config.MONGO_DEV_URI
      : config.MONGO_TEST_URI;
  return connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

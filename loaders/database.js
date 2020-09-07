import { connect } from "mongoose";

export default function (app, config) {
  return connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

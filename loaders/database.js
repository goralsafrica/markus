import { connect } from "mongoose";

export default function (app, { dbURI }) {
  return connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

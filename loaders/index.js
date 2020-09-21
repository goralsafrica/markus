import dbLoader from "./database";
import routes from "./routes";

export default function loader(app, config) {
  return dbLoader(app, config)
    .then(routes(app, config))
    .then(() => Promise.resolve("resources have been loaded successfully"))
    .catch((err) => {
      console.log(err);
      process.exit();
    });
}

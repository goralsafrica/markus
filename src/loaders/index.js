import dbLoader from "./database";
import routes from "./routes";
import cleanUps from "./cleanup";
export default function loader(app, config) {
  return dbLoader(app, config)
    .then(routes(app, config))
    .then(cleanUps())
    .then(() => Promise.resolve("resources have been loaded successfully"))
    .catch((err) => {
      console.log(err);
      process.exit();
    });
}

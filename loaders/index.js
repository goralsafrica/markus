import dbLoader from "./database";
//import routes from "./routes";

export default function loader(app, config) {
  return (
    dbLoader(app, config)
      //.then(routes(app, config))
      .then(() => Promise.resolve("setup success"))
      .catch((err) => {
        console.log(err);
        process.exit();
      })
  );
}

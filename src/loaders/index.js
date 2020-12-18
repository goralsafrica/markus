import dbLoader from "./database";
import loadRoutes from "./routes";
import loadProviders from "../providers/index";
import loadCleanups from "./cleanup";

export default function loader(app, config) {
  return Promise.all([
    dbLoader(app, config),
    loadCleanups(),
    loadProviders(app, config),
    loadRoutes(app, config),
    loadCleanups(app, config),
  ]);
}

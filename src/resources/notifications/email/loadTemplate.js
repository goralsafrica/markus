import { compile } from "handlebars";
import { join } from "path";
import { readFileSync } from "fs";
export default async function (template, payload) {
  try {
    const data = readFileSync(join(__dirname, "templates/", template), "utf8");
    const createTemplate = compile(data);
    const mail = createTemplate(payload);
    return mail;
  } catch (err) {
    console.log(err);
    process.exit();
  }
}

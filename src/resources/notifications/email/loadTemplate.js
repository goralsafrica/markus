import { compile } from "handlebars";
import { join, resolve } from "path";
import { readFileSync, existsSync } from "fs";
export default async function (template, payload) {
  const filePath = join(__dirname, "templates/", template);
  try {
    if (!existsSync(filePath)) throw new Error("file not found");
    const data = readFileSync(filePath, "utf8");
    const createTemplate = compile(data);
    const mail = createTemplate(payload);
    return mail;
  } catch (err) {
    throw err;
  }
}

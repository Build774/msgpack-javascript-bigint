#!ts-node
/* eslint-disable no-console */

import fs from "fs";
import path from "path";

function listJS(d: string): Array<string> {
  return fs
    .readdirSync(d)
    .filter((file) => file.endsWith(".js"))
    .map((file) => path.join(d, file));
}

const dir = process.argv[2];

const files = [...listJS(dir), ...listJS(path.join(dir, "utils"))];

for (const file of files) {
  const fileMjs = file.replace(/\.js$/, ".mjs");
  console.info(`Processing ${file} => ${fileMjs}`);
  // .js => .mjs
  const content = fs.readFileSync(file).toString("utf-8");
  const newContent = content
    .replace(/\bfrom "([^"]+)";/g, 'from "$1.mjs";')
    .replace(/\/\/# sourceMappingURL=(.+)\.js\.map$/, "//# sourceMappingURL=$1.mjs.map");
  fs.writeFileSync(fileMjs, newContent);
  fs.unlinkSync(file);

  // .js.map => .mjs.map
  const mapping = JSON.parse(fs.readFileSync(`${file}.map`).toString("utf-8"));
  mapping.file = mapping.file.replace(/\.js$/, ".mjs");
  fs.writeFileSync(`${fileMjs}.map`, JSON.stringify(mapping));
  fs.unlinkSync(`${file}.map`);
}

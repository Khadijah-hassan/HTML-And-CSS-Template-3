import { cp, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const outputDirectory = resolve(root, "public");

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

for (const file of [
  "index.html",
  "styles.css",
  "google85ba2df064ad68e3.html",
  "sitemap.xml",
  "robots.txt",
]) {
  await cp(resolve(root, file), resolve(outputDirectory, file));
}

for (const directory of ["dist", "imgs"]) {
  await cp(resolve(root, directory), resolve(outputDirectory, directory), { recursive: true });
}

console.log("Static site copied to public/.");

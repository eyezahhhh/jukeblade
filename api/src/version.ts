import { readFileSync } from "fs";

const packageJson = JSON.parse(readFileSync("package.json").toString());
const VERSION = packageJson.version as string;

export default VERSION;

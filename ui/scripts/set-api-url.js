import dotenv from "dotenv";
import { mkdirSync, writeFileSync } from "fs";
dotenv.config();

const API_URL = process.env.API_URL || "http://127.0.0.1:3000";

mkdirSync("src/constants", {
	recursive: true,
});

writeFileSync(
	"src/constants/api-url.const.ts",
	`export const API_URL = "${API_URL}"`,
);

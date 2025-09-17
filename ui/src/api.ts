import createClient from "openapi-fetch";
import type { paths } from "./api-schema";

const Api = createClient<paths>({
	baseUrl: "http://jukeblade:3000",
});

export default Api;

import createClient from "openapi-fetch";
import type { paths } from "./api-schema";

const Api = createClient<paths>({
	baseUrl: "http://127.0.0.1:3000",
});

export default Api;

import createClient from "openapi-fetch";
import type { paths } from "./api-schema";
import { API_URL } from "./constants/api-url.const";

const Api = createClient<paths>({
	baseUrl: API_URL,
});

export default Api;

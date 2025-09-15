import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app.tsx";
import { BrowserRouter } from "react-router";
import "./global.scss";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>,
);

import styles from "./app.module.scss";
import { Link, Route, Routes, useLocation } from "react-router";
import RemotePage from "./pages/remote";
import { cc } from "./utils/string.util";
import DiscsPage from "./pages/discs";
import CreateDiscPage from "./pages/discs/create";
import DiscPage from "./pages/disc";

export default function App() {
	const location = useLocation();

	return (
		<div className={styles.container}>
			<div className={styles.nav}>
				<Link
					to="/remote"
					className={cc(
						styles.navLink,
						location.pathname == "/remote" && styles.open,
					)}
				>
					Remote
				</Link>
				<Link
					to="/discs"
					className={cc(
						styles.navLink,
						(location.pathname == "/discs" ||
							location.pathname.startsWith("/disc/") ||
							location.pathname.startsWith("/discs/")) &&
							styles.open,
					)}
				>
					Discs
				</Link>
			</div>
			<div className={styles.content}>
				<Routes>
					<Route path="/remote" element={<RemotePage />} />
					<Route path="/discs" element={<DiscsPage />} />
					<Route path="/discs/create" element={<CreateDiscPage />} />
					<Route path="/disc/:uuid" element={<DiscPage />} />
				</Routes>
			</div>
		</div>
	);
}

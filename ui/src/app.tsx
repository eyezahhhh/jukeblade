import styles from "./app.module.scss";
import { Remote } from "./components/remote/remote.component";

export default function App() {
	return (
		<div className={styles.container}>
			<h1>Jukeblade</h1>
			<Remote />
		</div>
	);
}

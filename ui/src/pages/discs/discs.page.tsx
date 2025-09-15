import { Link } from "react-router";
import DiscListEntry from "../../components/disc-list-entry";
import useDiscsStore from "../../state/discs.store";
import styles from "./discs.module.scss";
import { useEffect } from "react";

export function DiscsPage() {
	const { insertedDiscs, insertedDiscsController, fetchInsertedDiscs } =
		useDiscsStore();

	useEffect(() => {
		if (!insertedDiscsController && !insertedDiscs.length) {
			fetchInsertedDiscs().catch(() => {});
		}
	}, [insertedDiscs, insertedDiscsController]);

	return (
		<div>
			<Link to="/discs/create">Create</Link>
			<div className={styles.discList}>
				{insertedDiscs.map((disc) => (
					<DiscListEntry key={disc.uuid} disc={disc} />
				))}
			</div>
		</div>
	);
}

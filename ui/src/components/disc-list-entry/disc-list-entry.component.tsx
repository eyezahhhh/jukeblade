import { Link } from "react-router";
import type { Disc } from "../../api-schema";
import styles from "./disc-list-entry.module.scss";

interface Props {
	disc: Disc;
}

export function DiscListEntry({ disc }: Props) {
	return (
		<Link to={`/disc/${disc.uuid}`} className={styles.container}>
			<div className={styles.disc}>
				<span className={styles.position}>{disc.position || "-"}</span>
				<div className={styles.info}>
					<span className={styles.artist}>{disc.artist}</span>
					<span className={styles.album}>{disc.album}</span>
				</div>
			</div>
		</Link>
	);
}

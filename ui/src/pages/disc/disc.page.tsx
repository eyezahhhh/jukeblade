import { useState } from "react";
import { Link, useParams } from "react-router";
import Api from "../../api";
import styles from "./disc.module.scss";
import useDisc from "../../hooks/disc.hook";
import TrackListEntry from "../../components/track-list-entry";
import List from "../../components/list";
import Row from "../../components/row";

export function DiscPage() {
	const { uuid } = useParams();
	const [isPlaying, setIsPlaying] = useState(false);
	const disc = useDisc(uuid);

	if (!disc) {
		return <h1>Loading</h1>;
	}

	const play = () => {
		if (isPlaying) {
			return;
		}
		setIsPlaying(true);
		Api.POST("/discs/{uuid}/play", {
			params: {
				path: {
					uuid: disc.uuid,
				},
			},
			body: {},
		}).finally(() => setIsPlaying(false));
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.album}>{disc.album}</h1>
			<h2 className={styles.artist}>{disc.artist}</h2>
			<Row>
				<button onClick={play} className="button">
					Play
				</button>
				<Link to={`/disc/${disc.uuid}/add`} className="button">
					Add track
				</Link>
			</Row>

			<List className={styles.tracks}>
				{disc.tracks.map((track) => (
					<TrackListEntry track={track} key={track.uuid} disc={disc} />
				))}
			</List>
		</div>
	);
}

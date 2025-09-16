import { useState } from "react";
import { Link, useParams } from "react-router";
import Api from "../../api";
import styles from "./disc.module.scss";
import useDisc from "../../hooks/disc.hook";

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
		}).finally(() => setIsPlaying(false));
	};

	return (
		<div>
			<h1>{disc.album}</h1>
			<h2>{disc.artist}</h2>
			<button onClick={play}>Play</button>
			<Link to={`/disc/${disc.uuid}/add`}>Add track</Link>
			<div className={styles.tracks}>
				{disc.tracks.map((track) => (
					<div key={track.uuid}>
						<span>{track.index}</span>
						<span>{track.title}</span>
					</div>
				))}
			</div>
		</div>
	);
}

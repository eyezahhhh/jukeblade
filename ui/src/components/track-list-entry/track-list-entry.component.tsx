import { useMemo, useState } from "react";
import type { Disc, Track } from "../../api-schema";
import styles from "./track-list-entry.module.scss";
import Api from "../../api";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
	track: Track;
	disc?: Disc;
	onDelete?: (disc: Disc) => void;
}

export function TrackListEntry({ track, disc: propDisc, onDelete }: Props) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const disc = useMemo(() => {
		return propDisc || track.disc || null;
	}, [propDisc, track.disc]);

	const play = () => {
		if (!disc || isPlaying) {
			return;
		}

		setIsPlaying(true);
		Api.POST("/discs/{uuid}/play", {
			params: {
				path: {
					uuid: disc.uuid,
				},
			},
			body: {
				trackUuid: track.uuid,
			},
		}).finally(() => {
			setIsPlaying(false);
		});
	};

	const deleteTrack = () => {
		if (!disc || isDeleting) {
			return;
		}
		setIsDeleting(true);
		Api.DELETE("/discs/{discUuid}/track/{trackUuid}", {
			params: {
				path: {
					uuid: disc.uuid,
					trackUuid: track.uuid,
				},
			},
		})
			.then(({ data }) => {
				if (data) {
					onDelete?.(data);
				}
			})
			.finally(() => {
				setIsDeleting(false);
			});
	};

	return (
		<div className={styles.container}>
			<div className={styles.start}>
				<span className={styles.index}>{track.index}</span>
				<button className={styles.play} onClick={play}>
					<PlayArrowIcon />
				</button>
			</div>
			<span className={styles.title}>{track.title}</span>
			<span className={styles.artist}>{disc?.artist || "Unknown Artist"}</span>
			<span className={styles.album}>{disc?.album || "Unknown Album"}</span>
			<button className={styles.delete} onClick={deleteTrack}>
				<DeleteIcon />
			</button>
		</div>
	);
}

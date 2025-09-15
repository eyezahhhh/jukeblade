import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Disc } from "../../api-schema";
import Api from "../../api";

export function DiscPage() {
	const { uuid } = useParams();
	const [disc, setDisc] = useState<Disc | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		if (!uuid) {
			return;
		}
		const controller = new AbortController();
		Api.GET("/discs/{uuid}", {
			params: {
				path: {
					uuid,
				},
			},
			signal: controller.signal,
		}).then(({ data }) => {
			if (data) {
				setDisc(data);
			}
		});

		return () => {
			controller.abort();
		};
	}, [uuid]);

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
		</div>
	);
}

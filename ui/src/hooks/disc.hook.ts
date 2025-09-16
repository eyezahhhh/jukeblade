import { useEffect, useState } from "react";
import type { Disc } from "../api-schema";
import Api from "../api";

export default function useDisc(uuid?: string) {
	const [disc, setDisc] = useState<Disc | null>(null);

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

	return disc;
}

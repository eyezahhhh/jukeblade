import { Injectable } from "@nestjs/common";
import VERSION from "src/version";
import Axios from "axios";
import { Agent } from "https";
import { SearchRelease } from "./type/search-release.type";
import { IRelease, IReleaseList } from "musicbrainz-api";

@Injectable()
export class SearchService {
	private readonly mb = Axios.create({
		headers: {
			"User-Agent": `Jukeblade/${VERSION} (jukeblade@eyezah.com)`,
		},
		baseURL: "https://musicbrainz.org/ws/2",
		httpsAgent: new Agent({
			family: 4,
		}),
	});

	private readonly axios = Axios.create({
		httpsAgent: new Agent({
			family: 4,
		}),
	});

	async search(query: string): Promise<SearchRelease[]> {
		const response = await this.mb.get<IReleaseList>("release", {
			params: new URLSearchParams({
				fmt: "json",
				query,
			}),
		});

		const releases: SearchRelease[] = response.data.releases.map((release) => ({
			id: release.id,
			artist:
				release["artist-credit"]?.map((artist) => artist.name).join(", ") ||
				"Unknown Artist",
			title: release.title,
			albumCover: null,
			media: [],
		}));

		await Promise.allSettled(
			releases.map((release) =>
				this.mb
					.get<IRelease>(`release/${release.id}`, {
						params: new URLSearchParams({
							inc: "recordings",
							fmt: "json",
						}),
					})
					.then((response) => {
						for (let media of response.data.media) {
							release.media.push({
								format: media.format || null,
								tracks: media.tracks
									.map((track) => ({
										position: track.position,
										title: track.title,
										duration: track.length,
									}))
									.sort((a, b) => a.position - b.position),
							});
						}

						if (response.data["cover-art-archive"].front) {
							return this.axios
								.get(`https://coverartarchive.org/release/${release.id}`)
								.then((response) => {
									const image = response.data.images.find(
										(image) => image.approved && image.front,
									);
									if (image) {
										release.albumCover = image.image;
									}
								});
						}
					}),
			),
		);

		return releases.filter((release) => release.media.length);
	}
}

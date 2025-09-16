import { Injectable } from "@nestjs/common";
import { MusicBrainzApi } from "musicbrainz-api";
import VERSION from "src/version";

@Injectable()
export class SearchService {
	private readonly mb = new MusicBrainzApi({
		appName: "Jukeblade",
		appVersion: VERSION,
		appContactInfo: "jukeblade@eyezah.com",
	});

	search() {}
}

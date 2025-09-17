import { ApiProperty } from "@nestjs/swagger";
import { SearchReleaseTrack } from "./search-release-track.type";

export class SearchReleaseMedia {
	@ApiProperty({
		type: String,
		nullable: true,
	})
	format: string | null;

	@ApiProperty({
		type: [SearchReleaseTrack],
	})
	tracks: SearchReleaseTrack[];
}
